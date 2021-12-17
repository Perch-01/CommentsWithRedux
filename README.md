# CommentsWithRedux

## Overview
This is an app that allows users to create a username and write comments under different people's comments. There is no database so the storage used is redux-persist . Users can post comments, reply to comments and delete their comments.

## Usage
To use it, write down a username longer than 2 letters and click continue. Now you can post comments and reply under other people's comments. To delete a comment, you must have the same username as the person who posted it.


Here is a video of the implementation. 


https://user-images.githubusercontent.com/74827204/146597639-c94e98c6-8feb-4d0a-9b47-3b680e9cc075.mp4





## Interview Questions

Question 1.)
Given the array [1,2,3,4,5,6,7,8,10] write a function that will remove all odd numbers.  

**Answer ->**
```
//index.ts

 const arrayValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const removeAllOddNumber = (array_: Array<number>) => {
    for (let i = 0; i < array_.length; i++) {
      if (array_[i] % 2 != 0) array_.splice(i, 1);
    }
  };
  removeAllOddNumber(arrayValues);
  console.log(arrayValues); // Output -> [2, 4, 6, 8, 10]
  
export default removeAllOddNumber;
``` 

Question 2.)
Given the array [1,2,3,4,5,6,7,8,10], write a function that will calculate the  sum of all odd numbers.   

**Answer ->**
```
//index.ts

  const arrayValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const totalOfAllOddNumbers = (array_: Array<number>) => {
    let total = 0;
    for (let i = 0; i < array_.length; i++) {
      if (array_[i] % 2 != 0) total += array_[i];
    }
    return total;
  };

  console.log(totalOfAllOddNumbers(arrayValues));// Output -> 25
  
export default totalOfAllOddNumbers;
``` 


