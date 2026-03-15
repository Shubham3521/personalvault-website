// UI interactions + payment + waitlist for PersonalVault
document.addEventListener('DOMContentLoaded',function(){
  // Existing UI code (hamburger + anchors)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}    
    })
  })
  // Remove any duplicate hamburger buttons (defensive fix)
  const allBurgers = document.querySelectorAll('.hamburger');
  if (allBurgers.length > 1) {
    for (let i = 1; i < allBurgers.length; i++) allBurgers[i].remove();
  }

  const nav = document.querySelector('header.site-nav .nav-inner');
  if(nav){
    // Find the existing hamburger in HTML and attach click handler — do NOT create a new button
    const burger = nav.querySelector('.hamburger');
    const navEl = nav.querySelector('nav');
    if(burger && navEl && !burger.dataset.bound){
      burger.dataset.bound = 'true';
      burger.addEventListener('click',()=>{
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!expanded));
        navEl.classList.toggle('open');
        document.body.classList.toggle('nav-open');
      })
    }
  }

  // Helper validators (match backend)
  function validEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
  function validPhone(phone){return /^\d{10}$/.test(String(phone).replace(/[^0-9]/g,''))}
  function validName(name){return typeof name==='string' && name.trim().length>0}

  // Pre-checkout form
  const preForm = document.getElementById('precheckout-form');
  const payButton = document.getElementById('pay-button');
  const preError = document.getElementById('precheckout-error');
  if(preForm){
    preForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      preError.style.display='none';
      const name = document.getElementById('pv-name').value.trim();
      const email = document.getElementById('pv-email').value.trim();
      const phone = document.getElementById('pv-phone').value.trim();
      if(!validName(name)){preError.textContent='Please enter your full name.';preError.style.display='block';return}
      if(!validEmail(email)){preError.textContent='Please enter a valid email address.';preError.style.display='block';return}
      if(!validPhone(phone)){preError.textContent='Please enter a valid 10-digit phone number.';preError.style.display='block';return}

      // disable button, show loading
      payButton.classList.add('loading'); payButton.disabled=true;
      try{
        const resp = await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone})});
        const data = await resp.json();
        if(!resp.ok){ throw new Error(data.error||'Could not create order. Please try again later.'); }

        const options = {
          key: data.key_id,
          amount: data.amount,
          currency: data.currency,
          name: 'PersonalVault',
          description: 'PersonalVault — Early bird pre-order',
          order_id: data.order_id,
          handler: async function(response){
            // verify payment on server
            try{
              const v = await fetch('/api/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(response)});
              const vr = await v.json();
              if(!v.ok){ throw new Error(vr.error||'Verification failed.'); }
              // redirect to success page with short id and shipping token
              window.location = `success.html?order=${encodeURIComponent(vr.short_id)}&token=${encodeURIComponent(vr.shipping_token)}`;
            }catch(err){
              alert(err.message || 'Verification failed. Please contact support@personalvault.in');
            }
          },
          modal: {
            ondismiss: function(){ payButton.classList.remove('loading'); payButton.disabled=false; }
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      }catch(err){
        preError.textContent = err.message || 'Something went wrong. Please try again.';
        preError.style.display='block';
        payButton.classList.remove('loading'); payButton.disabled=false;
      }
    })
  }

  // Waitlist form
  const waitForm = document.getElementById('waitlist-form');
  const waitButton = document.getElementById('waitlist-button');
  const waitSuccess = document.getElementById('waitlist-success');
  const waitError = document.getElementById('waitlist-error');
  if(waitForm){
    waitForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      waitError.style.display='none'; waitSuccess.style.display='none';
      const email = document.getElementById('waitlist-email').value.trim();
      if(!validEmail(email)){waitError.textContent='Please enter a valid email address.';waitError.style.display='block';return}
      waitButton.classList.add('loading'); waitButton.disabled=true;
      try{
        const resp = await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
        const data = await resp.json();
        if(!resp.ok){ throw new Error(data.error || 'Could not join waitlist. Please try again later.'); }
        waitSuccess.style.display='block'; waitSuccess.textContent = data.message || 'Thanks — we will notify you.';
      }catch(err){
        waitError.textContent = err.message || 'Something went wrong. Please try again.'; waitError.style.display='block';
      }finally{ waitButton.classList.remove('loading'); waitButton.disabled=false }
    })
  }
});
