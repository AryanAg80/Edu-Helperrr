import 'package:flutter/material.dart';
import "./newpage.dart" ; 
import './main.dart';


class Loginpage extends StatelessWidget {
  String user = "" ; 
  String pass = "" ; 
  String status = "" ; 
  Function pressedkeyhere ;

  Loginpage(this.status , this.pressedkeyhere , this.user , this.pass) ; 
  @override
  Widget build(BuildContext context) {
    return Column(children:  [Image(
                  image: NetworkImage(
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9FBZt4Rk1RClVWGwXugbtZr-hS5VsNmP4fbmQLje1Q&s")),
              Image(
                  image: NetworkImage(
                      "https://logindesigns.com/front/Login%20logo/logo-color.png")),
                      Divider(height: 100,
          color: Colors.black,
          thickness: 1,
          indent : 10,
          endIndent : 10,),Padding(
    padding: EdgeInsets.all(10),
    child: TextField(
        decoration: InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'User Name',
        hintText: 'Enter the mail ID' , 
      ),
      onChanged: (value) => user = value ,
    ),
  ),
  Padding(
    padding: EdgeInsets.all(10),
    child: TextField(
        obscureText: true,
        decoration: InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'Password',
        hintText: 'Enter your secure password'
      ),
      onChanged: (value) => pass = value
    ),
  ),
  ElevatedButton(
          onPressed: pressedkeyhere,
          child: Text('Login')),],);
    }
}