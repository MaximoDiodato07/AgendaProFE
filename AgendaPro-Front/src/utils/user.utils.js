export const isLogged = () => {

    const userToken = getToken();
    if (userToken){
        return true;
    }
    return false;
}

export const getUser = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user){
        return user;
    }
    return null;
}

export const getToken = () => {
    const token =  JSON.parse(sessionStorage.getItem('token'));
    return token;
}

export const setUser = (user, token = null) => {
    
    if (token){
        sessionStorage.setItem('token', JSON.stringify(token));
    }               

    sessionStorage.setItem('user', JSON.stringify(user));

    if (user.tipoUsuario == 'profesional'){
        sessionStorage.setItem('personalData', JSON.stringify(user.profesional));
    }
    else if (user.tipoUsuario == 'cliente'){
        sessionStorage.setItem('personalData', JSON.stringify(user.cliente));
    }

}

export const removeUser = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('personalData');
}

export const getPersonalData = () => {
  const personalData = JSON.parse(sessionStorage.getItem('personalData'));
  return personalData;
}

export const setPersonalData = (personalData) => {
  sessionStorage.removeItem('personalData');
  sessionStorage.setItem('personalData', JSON.stringify(personalData));
}

export const setCurrentProfileImageUrl = (url) => {
    const personalData = getPersonalData();
    personalData.imagen = url;
    setPersonalData(personalData);

    const user = getUser();
    if (user.tipoUsuario == 'profesional'){
        user.profesional.imagen = url;
    }
    else if (user.tipoUsuario == 'cliente'){
        user.cliente.imagen = url;
    }
    setUser(user);
    console.log(user);
    return true;
}



