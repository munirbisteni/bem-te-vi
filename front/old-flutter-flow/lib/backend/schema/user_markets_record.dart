import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class UserMarketsRecord extends FirestoreRecord {
  UserMarketsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "merketID" field.
  String? _merketID;
  String get merketID => _merketID ?? '';
  bool hasMerketID() => _merketID != null;

  // "dataCreated" field.
  DateTime? _dataCreated;
  DateTime? get dataCreated => _dataCreated;
  bool hasDataCreated() => _dataCreated != null;

  // "createdBy_User" field.
  DocumentReference? _createdByUser;
  DocumentReference? get createdByUser => _createdByUser;
  bool hasCreatedByUser() => _createdByUser != null;

  // "marketName" field.
  String? _marketName;
  String get marketName => _marketName ?? '';
  bool hasMarketName() => _marketName != null;

  // "marketAbout" field.
  String? _marketAbout;
  String get marketAbout => _marketAbout ?? '';
  bool hasMarketAbout() => _marketAbout != null;

  // "marketPhoto" field.
  String? _marketPhoto;
  String get marketPhoto => _marketPhoto ?? '';
  bool hasMarketPhoto() => _marketPhoto != null;

  // "marketItems_Ref" field.
  List<DocumentReference>? _marketItemsRef;
  List<DocumentReference> get marketItemsRef => _marketItemsRef ?? const [];
  bool hasMarketItemsRef() => _marketItemsRef != null;

  // "UsersFollowing_Ref" field.
  List<DocumentReference>? _usersFollowingRef;
  List<DocumentReference> get usersFollowingRef =>
      _usersFollowingRef ?? const [];
  bool hasUsersFollowingRef() => _usersFollowingRef != null;

  // "Likes" field.
  int? _likes;
  int get likes => _likes ?? 0;
  bool hasLikes() => _likes != null;

  // "likedBy_Users" field.
  List<DocumentReference>? _likedByUsers;
  List<DocumentReference> get likedByUsers => _likedByUsers ?? const [];
  bool hasLikedByUsers() => _likedByUsers != null;

  // "isVerified" field.
  bool? _isVerified;
  bool get isVerified => _isVerified ?? false;
  bool hasIsVerified() => _isVerified != null;

  void _initializeFields() {
    _merketID = snapshotData['merketID'] as String?;
    _dataCreated = snapshotData['dataCreated'] as DateTime?;
    _createdByUser = snapshotData['createdBy_User'] as DocumentReference?;
    _marketName = snapshotData['marketName'] as String?;
    _marketAbout = snapshotData['marketAbout'] as String?;
    _marketPhoto = snapshotData['marketPhoto'] as String?;
    _marketItemsRef = getDataList(snapshotData['marketItems_Ref']);
    _usersFollowingRef = getDataList(snapshotData['UsersFollowing_Ref']);
    _likes = castToType<int>(snapshotData['Likes']);
    _likedByUsers = getDataList(snapshotData['likedBy_Users']);
    _isVerified = snapshotData['isVerified'] as bool?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('userMarkets');

  static Stream<UserMarketsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => UserMarketsRecord.fromSnapshot(s));

  static Future<UserMarketsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => UserMarketsRecord.fromSnapshot(s));

  static UserMarketsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      UserMarketsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static UserMarketsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      UserMarketsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'UserMarketsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is UserMarketsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createUserMarketsRecordData({
  String? merketID,
  DateTime? dataCreated,
  DocumentReference? createdByUser,
  String? marketName,
  String? marketAbout,
  String? marketPhoto,
  int? likes,
  bool? isVerified,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'merketID': merketID,
      'dataCreated': dataCreated,
      'createdBy_User': createdByUser,
      'marketName': marketName,
      'marketAbout': marketAbout,
      'marketPhoto': marketPhoto,
      'Likes': likes,
      'isVerified': isVerified,
    }.withoutNulls,
  );

  return firestoreData;
}

class UserMarketsRecordDocumentEquality implements Equality<UserMarketsRecord> {
  const UserMarketsRecordDocumentEquality();

  @override
  bool equals(UserMarketsRecord? e1, UserMarketsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.merketID == e2?.merketID &&
        e1?.dataCreated == e2?.dataCreated &&
        e1?.createdByUser == e2?.createdByUser &&
        e1?.marketName == e2?.marketName &&
        e1?.marketAbout == e2?.marketAbout &&
        e1?.marketPhoto == e2?.marketPhoto &&
        listEquality.equals(e1?.marketItemsRef, e2?.marketItemsRef) &&
        listEquality.equals(e1?.usersFollowingRef, e2?.usersFollowingRef) &&
        e1?.likes == e2?.likes &&
        listEquality.equals(e1?.likedByUsers, e2?.likedByUsers) &&
        e1?.isVerified == e2?.isVerified;
  }

  @override
  int hash(UserMarketsRecord? e) => const ListEquality().hash([
        e?.merketID,
        e?.dataCreated,
        e?.createdByUser,
        e?.marketName,
        e?.marketAbout,
        e?.marketPhoto,
        e?.marketItemsRef,
        e?.usersFollowingRef,
        e?.likes,
        e?.likedByUsers,
        e?.isVerified
      ]);

  @override
  bool isValidKey(Object? o) => o is UserMarketsRecord;
}
