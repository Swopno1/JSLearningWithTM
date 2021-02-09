/** 
 * EasyHTTP Library
 * Library for makink HTTP requests
 * 
 * @version 2.0.0
 * @author Md Amir Hossain
 * @license MIT
 * 
 * **/

 class EasyHTTP {
  // Make an HTTP GET Request 
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    });
   }

   // Make an HTTP POST Request 
   post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    });
   }

   // Make an HTTP PUT Request 
   put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    });
   }

      // Make an HTTP DELETE Request 
      delete(url) {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(() => console.log('Resource Deleted...'))
          .catch(err => console.log(err));
        });
       }
 }