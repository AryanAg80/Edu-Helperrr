import 'package:bitbox_app/newpage.dart';
import 'package:flutter/material.dart';
import './login.dart';
import './dbHelper/mongodb.dart';
import './login1.dart' ; 

void main() async{
  WidgetsFlutterBinding.ensureInitialized() ; 
  await MongoDatabase.connect() ; 
  runApp( MyApp()) ; 
}

String message = "";

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  void handleLoginButtonPress() { 

    }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
            //backgroundColor: Colors.black,
            appBar: AppBar(
                title: const Text("Edu-Helper Bot"),
                centerTitle: true,
                backgroundColor: Colors.black,
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(15),
                        bottomRight: Radius.circular(15)))),
            body: SingleChildScrollView( child : message == "Akshat" ?         
                Loginpage(message , handleLoginButtonPress ,user , pass) : Newpage()
          )));
  }
  }

