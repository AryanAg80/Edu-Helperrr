
import 'package:flutter/material.dart';
import "./newpage.dart" ; 
import './main.dart';
class LoginApp extends StatefulWidget {
  @override
  State<LoginApp> createState() => _LoginAppState();
}
String user = "" ; 
String pass = "" ; 

class _LoginAppState extends State<LoginApp> {
   String status ; 
   void handleLoginButtonPress() { 
  setState(() {
    if((user=="akshat")&&(pass=="password")){
      message = "Akshat" ; 
      print(message) ; 
    }
    
  });

  
  

}

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
          onPressed: handleLoginButtonPress,
          child: Text('Login')),],);
    }
}