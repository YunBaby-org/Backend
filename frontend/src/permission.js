import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner:false})
import axios from 'axios'

/* 
    router beforeeach，簡單講就是導航守衛，可以用來
    做一些保護，例如未拿到驗證token，就不能往下
*/

router.beforeEach(async(to,from,next)=>{
    /*
        每次要切換route的時候，先去驗證狀態
        如果回傳4xx error ,代表你的token已經過期 
        所以redirect到login page 
    */

    NProgress.start()
 
    console.log('to: '+to.path)
    console.log('from: '+from.path)
    axios.get('/api/v1/resources/users/me').then((res)=>{
        console.log(res)
        next()
    }).catch(err=>{
        console.log('enter catch')
        console.log(err)

        // redirect to login page 

        if(to.path!=='/login'){
            next('/login')
        }
        else{
            next()
        }
    })

})

router.afterEach(()=>{
    //到了目的地後，nprogess結束
    NProgress.done()
})