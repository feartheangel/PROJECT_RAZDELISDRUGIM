export const vkAuth = () => {
  window.location.href =
    'https://oauth.vk.com/authorize?client_id=7880665&display=page&redirect_uri=https://razdelisdrugim.by&scope=email&response_type=code&v=5.52&state=vk';
};

export const googleAuth = () => {
  window.location.href =
    'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://razdelisdrugim.by/&response_type=code&client_id=1055303949536-f48flgc218nqkv8092ks478v2lp5rksv.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline';
};

export const facebookAuth = () => {
  window.location.href =
    'https://www.facebook.com/v11.0/dialog/oauth?client_id=197920688990183&redirect_uri=https://razdelisdrugim.by/&state=facebook';
};
