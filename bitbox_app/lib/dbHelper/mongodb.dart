import 'dart:developer';

import 'package:mongo_dart/mongo_dart.dart';
import './constant.dart' ; 

class User{
  ObjectId? _id;
  String? GG ; 
  String? user ;

}
class MongoDatabase{
  static var db , userCollection ; 
  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open() ;
    print(db.state) ;  
    final collection = db.collection('test');
    final User = await collection.find().toList();

    print(User) ; 

    inspect(db) ; 
    userCollection = db.collection("test") ; 
    

  }
}