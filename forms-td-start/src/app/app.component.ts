import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") signupForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = "Superuser";
    // This is how we can set values to
    // our controls directly from here
    // this.signupForm.setValue({
    // userData: {
    // username: suggestedName,
    // email: "",
    // },
    // secret: "pet",
    // questionAnswer: "",
    // gender: "male",
    // });
    // This is how we can patch a single
    // control
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // onSubmit(form: HTMLFormElement) {
  // onSubmit(form: NgForm) {
  // console.log(form);
  // }

  // Instead of passing it via argument, we
  // can use the @ViewChild to access to i
  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm);
    console.log(this.signupForm.valid);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // This will reset the entire form
    this.signupForm.reset();
  }
}
