import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];

  // This will hold our reactive form
  signUpForm: FormGroup;

  forbiddenUsernames = ["Chris", "Anna"];

  // We should initialize it, before rendering the
  // template so, we need to call a lifecycle hook
  // which is called before the template is rendered.
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      // This object is where we add our controls
      // We use strings as keys to make sure that
      // during minification, when this code gets
      // mangled, this property name is kept
      // because we will reference it in the HTML
      // code
      // The first argument of FormControl in the
      // initial state, the initial value of this
      // control. The second argument will be a
      // single validator, or an array of validators
      // we want to apply to this control, the third
      // argument will be potential asynchronous
      // validators.
      // We don't call this method, we just only
      // pass a reference to it.
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          // Since Angular will call this, we need to bind the
          // this keyword to get the right context
          this.forbiddenNames.bind(this),
        ]),
        // We can also have multiple validators, by simply passing
        // an array of validators
        // To use asynchronous validators we use the third
        // argument instead of the second
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          // We also need to bind it to this if we plan to
          // use this keyword in our validator function
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      // A FormArray holds an array of controls
      hobbies: new FormArray([]),
    });

    // this.signUpForm.valueChanges.subscribe((value) => console.log(value));
    this.signUpForm.statusChanges.subscribe((status) => console.log(status));

    this.signUpForm.setValue({
      userData: {
        username: "Max",
        email: "max@text.com",
      },
      gender: "male",
      hobbies: [],
    });

    this.signUpForm.patchValue({
      userData: {
        username: "Max",
      },
    });
  }

  // We don't get the form via local reference anymore,
  // we don't need to get his reference because we
  // created the form on our own, we already got access
  // to it in here.
  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  get controls() {
    return (this.signUpForm.get("hobbies") as FormArray).controls;
  }

  // -- or --
  // getControls() {
  // return (<FormArray>this.signUpForm.get("hobbies")).controls;
  // }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // We are casting the type inside the parentheses
    (<FormArray>this.signUpForm.get("hobbies")).push(control);
  }

  // Custom Validators are just functions
  // The return is a key value pari where the key can be
  // interpreted as a string
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // -1 is interpreted as true, so we need to check if is not equal
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        nameIsForbidden: true,
      };
    }
    // This need to return null, always if succeed
    return null;
  }

  // These are 2 constructs, promise and observable which handle asynchronous
  // data
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
