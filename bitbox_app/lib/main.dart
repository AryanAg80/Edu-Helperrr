import 'package:bitbox_app/newpage.dart';
import 'package:flutter/material.dart';
import './login.dart';
import './dbHelper/mongodb.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized() ; 
  await MongoDatabase.connect() ; 
  runApp(const MyApp()) ; 
}

String message = "";

class MyApp extends StatelessWidget {
  const MyApp({super.key});
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
                LoginApp() : Newpage()
          )));
  }
}

