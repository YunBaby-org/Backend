const Mock = require('mockjs-async')



Mock.mock('/api/v1/resources/users/me','get',async()=>{

    return{
        "message":"fucking error",
    }
})
Mock.mock('/api/v1/resources/users/information','get',async()=>{
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log('timeout')
            resolve()
        },3000)
    })
    return {
        "name":"邱品峰",
        "email":"azsx26735546@gmail.com"
    }
})


Mock.mock('/api/v2/resources/users/trackers','get',()=>{
    return {
        "trackers":{
            "test1id":{   
                "userid":"test1id",
                "name":"name1",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579955"
            },
            "test2id":{   
                "userid":"test2id",
                "name":"name2",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579947"
            },
            "test3id":{   
                "userid":"test3id",
                "name":"name3",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579955"
            },
            "test4id":{   
                "userid":"test4id",
                "name":"name4",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579947"
            },
        }
    }
})
Mock.mock('/user/locations','get',()=>{
    return {
        "markers":{
            "test1id":{
                "name":"name1",
                "current_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "radius":20
            },
            "test2id":{
                "name":"name2",
                "current_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "radius":20
            },    
            "test3id":{
                "name":"name3",
                "current_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "radius":20
            },          
        }
    }
})

/*  mock boundary   */
Mock.mock('/api/v1/resources/users/boundary/test1id','get',()=>{
    return {
        "boundary":{
            "lat":23.693979,
            "lng":120.530708,
            "radius":30
        }
    }
})

Mock.mock('/api/v1/resources/users/boundary/test2id','get',()=>{
    return {
        "boundary":{
            "lat":23.696344,
            "lng":120.532068,
            "radius":50
        }
    }
})
Mock.mock('/api/v1/resources/users/boundary/test3id','get',()=>{
    return {
        "boundary":{
            "lat":23.689878,
            "lng":120.537474,
            "radius":60
        }
    }
})

/*  mock tracker position    */
Mock.mock('/api/v1/resources/users/location','get',()=>{
    return {
        "boundary":{
            "lat":23.693979,
            "lng":120.530708,
            "radius":30
        }
    }
})

Mock.mock('/api/v1/resources/users/boundary/test2id','get',()=>{
    return {
        "boundary":{
            "lat":23.696344,
            "lng":120.532068,
            "radius":50
        }
    }
})
Mock.mock('/api/v1/resources/users/boundary/test3id','get',()=>{
    return {
        "boundary":{
            "lat":23.689878,
            "lng":120.537474,
            "radius":60
        }
    }
})