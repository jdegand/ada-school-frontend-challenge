# Ada School Frontend Challenge

This is a solution to an [Ada School repo](https://github.com/ada-school/front-end-challenge).

## Built With

- [Angular](https://angular.io)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.
- [Angular In Memory Web API](https://www.npmjs.com/package/angular-in-memory-web-api)

## Thoughts

- The structure of a template model does not need to match the TypeScript model.
- You can be creative and use this fact to your advantage to make some validation checks easier.  
- You have to test a template driven form by interacting with the DOM.
- `Step` is hit and miss in a `time` input.  It seems like it should work, but compatibility was changed at one point.  Across multiple browsers, it can vary.  I need to do more research, but this could be problematic.  I don't want to have to create a separate `step` function.
- Using the in-memory web API, I think it is important to use `JSON`.  
- I was using a `FormData` object and the POST request returned `{id: 3}` only (Booking collection starts with 2 objects).
- I am using code I found on [Stack Overflow](https://stackoverflow.com/questions/43347621/correct-way-to-do-a-put-or-post-in-angular-in-memory-web-api) and it uses `reqInfo.utils.getJsonBody(reqInfo.req)`.  I need look into more methods I can use.  Maybe, I don't have to convert my `FormData` into JSON.  
- Using different names for the form controls can add extra snags.  Sending FormData is usually not problematic with real backends.    

## Continued Development

- Tests (Angular Testing Library would be a good choice)

## Useful Resources

- [Angular Docs](https://angular.io/guide/forms) - forms
- [StackBlitz](https://stackblitz.com/run?file=src%2Fapp%2Fhero-form%2Fhero-form.component.html) - hero form
- [Angular University](https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/) - introduction to angular 2 forms template driven vs model driven
- [Medium](https://medium.com/@zeeshankhan8838/template-driven-form-in-angular-b80a3ebbcd24) - template driven form in angular
- [BezKoder](https://www.bezkoder.com/angular-17-template-driven-form-validation) - angular 17 template driven form validation
- [Blog](https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms#intro) - practical guide to angular template driven forms
- [Blog](https://blog.simplified.courses/angular-template-driven-forms-with-signals/) - angular template driven forms with signals
- [Dev.to](https://dev.to/railsstudent/signal-queries-in-angular-what-can-i-do-with-them-4ip1) - signal queries in angular what can i do with them
- [Stack Overflow](https://stackoverflow.com/questions/13713755/html-input-time-step-attribute-to-set-timestep-by-say-x-minutes) - html input time step attribute to set timestep by say x minutes
- [Dev.to](https://dev.to/michaeljota/template-forms-are-just-as-powerful-as-reactive-forms-140n) - template forms are just as powerful as reactive forms
- [Angular Docs](https://angular.io/tutorial/tour-of-heroes/toh-pt6) - tour of heroes part 6 
- [Stack Overflow](https://stackoverflow.com/questions/76427328/anyone-try-using-inmemorywebapi-with-standalone-components) - anyone try using inmemorywebapi with standalone components
- [Stack Overflow](https://stackoverflow.com/questions/42985153/error-collection-not-found-while-using-in-memory-web-api) - error collection not found while using in memory web api
- [Stack Overflow](https://stackoverflow.com/questions/43347621/correct-way-to-do-a-put-or-post-in-angular-in-memory-web-api) - correct way to do a put or post in angular in memory web api
- [Stack Overflow](https://stackoverflow.com/questions/40062477/formdata-append-not-working) - formdata append not working
- [Stack Overflow](https://stackoverflow.com/questions/52031766/angular-form-data-wont-append) - angular form data wont append