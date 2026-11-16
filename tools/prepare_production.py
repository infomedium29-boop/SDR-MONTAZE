#!/usr/bin/env python3
"""Enable SEO only AFTER owner approves site, public contact data, legal text and domain."""
import argparse,json,re
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree.ElementTree import Element,SubElement,ElementTree,indent

ROOT=Path(__file__).resolve().parent.parent
p=argparse.ArgumentParser(description='Prepare SDR Montaže for production indexing')
p.add_argument('--domain',required=True,help='Public canonical HTTPS origin, e.g. https://www.example.hr')
p.add_argument('--owner-approved',action='store_true',help='I have checked the official business name, services, contact and legal pages with the owner')
a=p.parse_args()
origin=a.domain.rstrip('/')
u=urlsplit(origin)
if u.scheme!='https' or not u.netloc or u.path or u.query or u.fragment:
 p.error('--domain must be a plain HTTPS origin without path, e.g. https://your-domain.hr')
if not a.owner_approved:
 p.error('Owner approval of contact, services and legal texts is required. Add --owner-approved only after verification.')
urls=[]
for path in sorted(ROOT.rglob('index.html')):
 route='/' if path.parent==ROOT else '/'+path.parent.relative_to(ROOT).as_posix()+'/'
 full=origin+route
 html=path.read_text(encoding='utf-8')
 html=html.replace('name="robots" content="noindex,nofollow"','name="robots" content="index,follow"')
 html=html.replace('<meta property="og:type"',f'<link rel="canonical" href="{full}"><meta property="og:url" content="{full}"><meta property="og:type"')
 html=html.replace('<meta property="og:image" content="/assets/images/og-image.jpg">',f'<meta property="og:image" content="{origin}/assets/images/og-image.jpg">')
 def update_json(m):
  obj=json.loads(m.group(1))
  def fix(v):
   if isinstance(v,dict):
    for key,val in v.items():
     if key=='item' and isinstance(val,str) and val.startswith('/'):
      v[key]=origin+val
     else:fix(val)
   elif isinstance(v,list):
    for val in v:fix(val)
  fix(obj)
  return '<script type="application/ld+json">'+json.dumps(obj,ensure_ascii=False,separators=(',',':'))+'</script>'
 html=re.sub(r'<script type="application/ld\+json">(.*?)</script>',update_json,html)
 path.write_text(html,encoding='utf-8')
 urls.append(full)
# Never index the custom 404 page
sitemap=Element('urlset',{'xmlns':'http://www.sitemaps.org/schemas/sitemap/0.9'})
for url in urls:
 entry=SubElement(sitemap,'url');SubElement(entry,'loc').text=url
indent(sitemap,space='  ')
ElementTree(sitemap).write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {origin}/sitemap.xml\n',encoding='utf-8')
print('Production SEO configured:',len(urls),'pages for',origin)
