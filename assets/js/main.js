(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');
  const qs = (q, el=document) => el.querySelector(q);
  const qsa = (q, el=document) => [...el.querySelectorAll(q)];
  const safeStorage = {
    get(key,session=false){try{return (session?sessionStorage:localStorage).getItem(key)}catch{return null}},
    set(key,val,session=false){try{(session?sessionStorage:localStorage).setItem(key,val)}catch{}}
  };

  // INTRO — first view of the session, skips on reduced motion and inner pages.
  const intro = qs('#site-intro');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (intro && !safeStorage.get('sdr-intro-seen',true) && !reduced) {
    intro.classList.add('is-active');
    intro.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    let timer;
    const exit = () => {
      clearTimeout(timer);
      if(!intro.classList.contains('is-active'))return;
      intro.classList.add('is-exiting');
      intro.classList.remove('is-active');
      intro.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      safeStorage.set('sdr-intro-seen','1',true);
      setTimeout(() => intro.remove(), 800);
    };
    timer = setTimeout(exit, 2360);
    qs('[data-intro-skip]',intro)?.addEventListener('click',exit);
    intro.addEventListener('keydown', e => {if(e.key==='Escape'||e.key==='Enter')exit()});
  }else{intro?.remove()}

  // FLOATING HEADER / MENU / DROPDOWN.
  const header=qs('[data-header]'),toggle=qs('[data-menu-toggle]'),nav=qs('.nav'),scrim=qs('[data-menu-scrim]');
  const scrolled=()=>header?.classList.toggle('is-scrolled',window.scrollY>50);
  scrolled();window.addEventListener('scroll',scrolled,{passive:true});
  const setMenu=open=>{
    document.body.classList.toggle('menu-open',open);
    toggle?.setAttribute('aria-expanded',String(open));
    toggle?.setAttribute('aria-label',open?'Zatvori izbornik':'Otvori izbornik');
    if(!open)qsa('.nav__dropdown.is-open').forEach(el=>{
      el.classList.remove('is-open');qs('[data-dropdown-toggle]',el)?.setAttribute('aria-expanded','false')
    });
  };
  toggle?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  scrim?.addEventListener('click',()=>setMenu(false));
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  qsa('[data-dropdown-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    const holder=btn.closest('.nav__dropdown');
    const open=!holder.classList.contains('is-open');
    holder.classList.toggle('is-open',open);
    btn.setAttribute('aria-expanded',String(open));
  }));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(window.innerWidth>920)setMenu(false)},{passive:true});
  qsa('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

  // SCROLL REVEAL — respects reduced motion.
  const reveals=qsa('.reveal');
  if('IntersectionObserver' in window && !reduced){
    const io=new IntersectionObserver((entries,observer)=>entries.forEach(ent=>{
      if(ent.isIntersecting){ent.target.classList.add('is-visible');observer.unobserve(ent.target)}
    }),{threshold:.11,rootMargin:'0px 0px 30px 0px'});
    reveals.forEach(el=>io.observe(el));
  }else reveals.forEach(el=>el.classList.add('is-visible'));

  // GALLERY FILTER + KEYBOARD ACCESSIBLE LIGHTBOX.
  const galleryItems=qsa('[data-gallery-item]'),dialog=qs('#gallery-lightbox');
  const img=qs('[data-lightbox-img]'),caption=qs('[data-lightbox-caption]');
  let displayed=galleryItems, current=0,lastFocus=null;
  function galleryOpen(index){
    if(!dialog||!displayed.length)return;
    lastFocus=document.activeElement;
    current=index;
    galleryUpdate();
    try{dialog.showModal()}catch{dialog.setAttribute('open','')}
    document.body.classList.add('lightbox-open');
    qs('[data-lightbox-close]')?.focus();
  }
  function galleryUpdate(){
    const el=displayed[(current+displayed.length)%displayed.length];if(!el)return;
    img.src=el.dataset.fullSrc||'';
    img.alt='Ilustrativni prikaz: '+(el.dataset.title||'');
    caption.textContent=el.dataset.title||'Fotografija';
  }
  function galleryClose(){if(dialog?.open)dialog.close();document.body.classList.remove('lightbox-open');lastFocus?.focus()}
  galleryItems.forEach(el=>el.addEventListener('click',()=>galleryOpen(displayed.indexOf(el))));
  qsa('[data-gallery-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    const filter=btn.dataset.galleryFilter;
    qsa('[data-gallery-filter]').forEach(b=>{const active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
    galleryItems.forEach(el=>{el.hidden=filter!=='all'&&el.dataset.galleryCat!==filter});
    displayed=galleryItems.filter(el=>!el.hidden);
  }));
  qs('[data-lightbox-close]')?.addEventListener('click',galleryClose);
  qs('[data-lightbox-prev]')?.addEventListener('click',()=>{current=(current-1+displayed.length)%displayed.length;galleryUpdate()});
  qs('[data-lightbox-next]')?.addEventListener('click',()=>{current=(current+1)%displayed.length;galleryUpdate()});
  dialog?.addEventListener('click',e=>{if(e.target===dialog)galleryClose()});
  dialog?.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');lastFocus?.focus()});
  document.addEventListener('keydown',e=>{
    if(!dialog?.open)return;
    if(e.key==='ArrowLeft'){current=(current-1+displayed.length)%displayed.length;galleryUpdate()}
    if(e.key==='ArrowRight'){current=(current+1)%displayed.length;galleryUpdate()}
  });

  // CONTACT FORM: Web3Forms when configured, mailto draft for DEMO (never falsely claims message was sent).
  const form=qs('[data-contact-form]'),formStatus=qs('[data-form-status]');
  const formMessage=(message,error=false)=>{
    if(!formStatus)return;
    formStatus.hidden=false;formStatus.className='form-status '+(error?'is-error':'is-success');formStatus.textContent=message;
  };
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();formMessage('Provjerite obavezna polja i pokušajte ponovno.',true);return}
    if(form.elements.website.value)return;
    const fields=new FormData(form),cfg=window.SDR_CONFIG||{},submit=qs('[data-submit-btn]',form);
    if(cfg.web3formsAccessKey){
      submit.disabled=true;submit.setAttribute('aria-busy','true');
      try{
        const payload=new FormData();
        payload.append('access_key',cfg.web3formsAccessKey);
        payload.append('subject','Upit s web stranice SDR Montaže');
        payload.append('from_name','Web SDR Montaže');
        for(const [k,v] of fields.entries()){if(k!=='consent'&&k!=='website')payload.append(k,v)}
        const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:payload});
        const data=await response.json();
        if(!response.ok||!data.success)throw Error(data.message||'Neuspjelo slanje');
        formMessage('Hvala vam! Vaš upit je uspješno poslan.');form.reset();
      }catch(err){formMessage('Slanje nije uspjelo. Molimo, javite nam se telefonom ili e-mailom.',true)}
      finally{submit.disabled=false;submit.removeAttribute('aria-busy')}
    }else{
      const lines=[`Ime: ${fields.get('name')}`,`Telefon: ${fields.get('phone')}`,`E-mail: ${fields.get('email')}`,`Usluga: ${fields.get('service')}`,`Lokacija: ${fields.get('location')}`,'',`${fields.get('message')}`];
      const url=`mailto:${String(cfg.contactEmail||'').replace(/[^\w.+@-]/g,'')}?subject=${encodeURIComponent('Upit za montažu – SDR Montaže')}&body=${encodeURIComponent(lines.join('\n'))}`;
      formMessage('Otvara se nacrt e-mail poruke. Provjerite i pošaljite poruku iz svojeg e-mail programa.');
      window.location.href=url;
    }
  });


  // A third-party map is loaded ONLY after the visitor explicitly requests it.
  const loadMap = qs('[data-load-map]');
  loadMap?.addEventListener('click', () => {
    const holder=qs('[data-map-container]'),frame=qs('[data-map-frame]',holder);
    if(!frame)return;
    frame.src='https://www.google.com/maps?q=%C5%BDminj%2C%20Istra%2C%20Hrvatska&output=embed';
    frame.hidden=false;
    const placeholder=qs('[data-map-placeholder]',holder);
    if(placeholder)placeholder.hidden=true;
  });

  // GDPR CONSUMER CHOICE: no external analytics loaded without consent.
  const banner=qs('[data-cookie-banner]'),cookieModal=qs('[data-cookie-modal]');
  const cookieKey='sdr-cookie-choice-v1';
  const old=safeStorage.get(cookieKey);
  if(banner&&!old)banner.hidden=false;
  const storeChoice=analytics=>{
    safeStorage.set(cookieKey,JSON.stringify({necessary:true,analytics:!!analytics,updated:new Date().toISOString()}));
    banner.hidden=true;cookieModal.hidden=true;
    // Note: analytics intentionally not installed in demo. Production consent-loader goes here.
  };
  qs('[data-cookie-accept]')?.addEventListener('click',()=>storeChoice(true));
  qs('[data-cookie-reject]')?.addEventListener('click',()=>storeChoice(false));
  function openSettings(){
    cookieModal.hidden=false;
    let analytics=false;try{analytics=!!JSON.parse(safeStorage.get(cookieKey)||'{}').analytics}catch{}
    const check=qs('[data-analytics-choice]');if(check)check.checked=analytics;
    qs('[data-cookie-modal-close]')?.focus();
  }
  qs('[data-cookie-customize]')?.addEventListener('click',openSettings);
  qsa('[data-cookie-settings]').forEach(el=>el.addEventListener('click',openSettings));
  qs('[data-cookie-modal-close]')?.addEventListener('click',()=>cookieModal.hidden=true);
  qs('[data-cookie-save]')?.addEventListener('click',()=>storeChoice(!!qs('[data-analytics-choice]')?.checked));
  cookieModal?.addEventListener('click',e=>{if(e.target===cookieModal)cookieModal.hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cookieModal&&!cookieModal.hidden)cookieModal.hidden=true});
})();
