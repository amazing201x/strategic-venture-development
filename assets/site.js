
(function(){
  "use strict";

  const panel = document.getElementById("project-form");
  const openBtn = document.querySelector('[data-open-project-form]');
  const closeBtn = document.querySelector('[data-close-project-form]');
  const form = document.getElementById("hesyn-project-form");
  const status = document.getElementById("form-status");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  function openPanel(){
    if(!panel) return;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden","false");
    if(history && history.replaceState) history.replaceState(null,"","#project-form");
    setTimeout(function(){ panel.scrollIntoView({behavior:"smooth", block:"start"}); }, 20);
  }

  function closePanel(){
    if(!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden","true");
    if(history && history.replaceState) history.replaceState(null,"","#contact");
  }

  if(openBtn) openBtn.addEventListener("click", function(e){ e.preventDefault(); openPanel(); });
  if(closeBtn) closeBtn.addEventListener("click", function(e){ e.preventDefault(); closePanel(); });
  if(location.hash === "#project-form") openPanel();

  if(!form) return;

  form.addEventListener("submit", async function(e){
    e.preventDefault();

    if(!form.reportValidity()) return;

    // Simple bot trap. Humans never see or fill this field.
    const hp = form.querySelector('input[name="_gotcha"]');
    if(hp && hp.value){
      form.reset();
      return;
    }

    status.className = "submit-status";
    status.textContent = "Submitting…";
    if(submitBtn){
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = "SUBMITTING…";
    }

    try{
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {"Accept":"application/json"}
      });

      if(response.ok){
        form.reset();
        status.className = "submit-status success";
        status.textContent = "Thank you. We’ll take a first look at what could be.";
      }else{
        let msg = "Submission failed.";
        try{
          const data = await response.json();
          if(data && data.errors && data.errors.length){
            msg = data.errors.map(function(x){ return x.message; }).join(" ");
          }
        }catch(_){}
        throw new Error(msg);
      }
    }catch(err){
      // Graceful fallback: if AJAX is blocked in a browser/environment, perform a normal POST.
      status.className = "submit-status";
      status.textContent = "Secure submission fallback…";
      try{
        form.removeEventListener("submit", arguments.callee);
      }catch(_){}
      form.submit();
      return;
    }finally{
      if(submitBtn){
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.label || "SUBMIT PROJECT →";
      }
    }
  });
})();
