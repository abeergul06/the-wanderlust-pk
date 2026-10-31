// Uses the existing Auth and apiRequest helpers in js/api.js.
if (Auth.getToken()) window.location.href = "./index.html";
const $ = (id) => document.getElementById(id);
const loginView = $("login-view"), registerView = $("register-view");
const loginButton = $("submit-btn"), registerButton = $("register-btn");
$("year").textContent = new Date().getFullYear();

function notice(id, message){const el=$(id);el.textContent=message;el.hidden=!message;}
function clear(prefix){notice(prefix+"-error","");notice(prefix+"-success","");}
function busy(button, value, label){button.disabled=value;button.querySelector("span").textContent=value?label:button.dataset.label;}
loginButton.dataset.label="Sign in";registerButton.dataset.label="Create account";

$("show-register").addEventListener("click",()=>{clear("login");clear("register");loginView.hidden=true;registerView.hidden=false;$("register-name").focus();});
$("show-login").addEventListener("click",()=>{clear("login");clear("register");registerView.hidden=true;loginView.hidden=false;$("email").focus();});
document.querySelectorAll("[data-toggle-password]").forEach(button=>button.addEventListener("click",()=>{
  const input=$(button.dataset.togglePassword),show=input.type==="password";
  input.type=show?"text":"password";button.textContent=show?"Hide":"Show";
  button.setAttribute("aria-label",show?"Hide password":"Show password");button.setAttribute("aria-pressed",String(show));
}));

$("login-form").addEventListener("submit",async event=>{
  event.preventDefault();clear("login");
  const email=$("email").value.trim(),password=$("password").value;
  if(!email||!password){notice("login-error","Please enter your email address and password.");return;}
  busy(loginButton,true,"Signing in…");
  try{
    const data=await apiRequest("/auth/login",{method:"POST",body:{email,password}});
    Auth.setSession(data.token,data.admin);window.location.href="./index.html";
  }catch(error){
    const message=/401|invalid credentials|unauthorized/i.test(error.message||"")
      ?"Invalid email or password.":(error.message||"Unable to sign in. Please try again.");
    notice("login-error",message);
  }finally{busy(loginButton,false);}
});

$("register-form").addEventListener("submit",async event=>{
  event.preventDefault();clear("register");
  const name=$("register-name").value.trim(),email=$("register-email").value.trim();
  const invitationCode=$("invite-code").value.trim(),password=$("register-password").value;
  const confirmPassword=$("confirm-password").value;
  if(!name||!email||!invitationCode||!password||!confirmPassword){notice("register-error","Please complete all fields.");return;}
  if(password.length<8){notice("register-error","Your password must be at least 8 characters.");return;}
  if(password!==confirmPassword){notice("register-error","The passwords do not match.");return;}
  busy(registerButton,true,"Creating account…");
  try{
    // Backend must verify, expire and consume the invitation before creating an admin.
    await apiRequest("/auth/register",{method:"POST",body:{name,email,password,invitationCode}});
    $("register-form").reset();notice("register-success","Account created. You can now sign in.");
    window.setTimeout(()=>{registerView.hidden=true;loginView.hidden=false;$("email").value=email;$("password").focus();},900);
  }catch(error){
    const message=/404|not found/i.test(error.message||"")
      ?"Invitation registration is not enabled on the server yet. Please ask your administrator to finish the server setup."
      :(error.message||"Unable to create account. Check your invitation and try again.");
    notice("register-error",message);
  }finally{busy(registerButton,false);}
});
