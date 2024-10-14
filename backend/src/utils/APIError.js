class HandleAPIError extends Error  {
    constructor( errorMessage = " something went wrong ", 
        statusCode = 500, 
        errors = [], 
        stack ="" )        //parameters r initialized here . default values
        {
            super(errorMessage)     //super class to override the message atleast
            this.statusCode = statusCode;
            this.errorMessage = errorMessage;
            this.errors = errors;
            this.data = null; //initialise a property data that can be used later to store some information

            if(stack){
                this.stack = stack;
            }
            else {
                Error.captureStackTrace(this, this.constructor)
            }
        }
}

export {HandleAPIError}

// this class is used to give proper structure to the error codes and messages recieved. 
// class class_name extends parent_name (
//     constructor(parameters) {
//         use this to edit those parameters
//     }
// )
// extends Error: This indicates that handleAPIError is a subclass of the built-in Error class. This allows it to inherit properties and methods from Error.


// When an error is thrown in JavaScript, it generates a stack trace that shows the path of execution leading up to the point where the error occurred. 



// When you create an error, you typically don’t want to see the constructor call in the stack trace because it doesn’t provide meaningful information about where the error originated. By passing this.constructor as the second argument, you ensure that the stack trace focuses on the relevant function calls that led to the error. 

// MyError: An error occurred in functionC
//     at MyError (path/to/file.js:lineNumber:columnNumber) // Constructor call
//     at functionC (path/to/file.js:lineNumber:columnNumber)
//     at functionB (path/to/file.js:lineNumber:columnNumber)
//     at functionA (path/to/file.js:lineNumber:columnNumber)

// here MyError was included because this.constructor was not used and its not useful 
