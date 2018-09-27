let mutations = {
    setAccountNum(state){
        let accountNum  = window.localStorage.getItem('accountNum')
        this.state.accountNum = accountNum
    }
}
export default mutations