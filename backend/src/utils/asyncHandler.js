// try catch method for handling 
const asyncHandler = (asyncFunction) => {
   return async (req, res, next) => {
        try {
           await asyncFunction(req,res,next) 
        } catch (error) {
           res.status(error.code || 500).json({
                sucucess: false,
                message : error.message
           }) 
        }
    }
}

export {asyncHandler}

// note :
// the asyncHandler is a higherorder function that takes function as parameter
// const asyncHandler = () => {}  //normal function
// const asyncHandler = (func) => { () => {} } //higher order function
// const func = () => {}  
    
// promises method 

// const asyncHandler = (asyncFunction) => { (req,res,next) => {
//     Promise.resolve(
//         asyncFunction(req,res,next)     //promise -> resolve ya reject, reject ho to catch error 
//     ).catch(error, (error) => {
//         console.log(error.message); 
//         next(error)
        
//     })
// } }