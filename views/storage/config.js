export default{
    data(jwt){
        console.log(jwt);
        localStorage.setItem("jwt", jwt)
    }

}