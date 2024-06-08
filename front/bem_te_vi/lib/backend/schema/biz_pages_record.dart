import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class BizPagesRecord extends FirestoreRecord {
  BizPagesRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "groupID" field.
  String? _groupID;
  String get groupID => _groupID ?? '';
  bool hasGroupID() => _groupID != null;

  // "dataCreated" field.
  DateTime? _dataCreated;
  DateTime? get dataCreated => _dataCreated;
  bool hasDataCreated() => _dataCreated != null;

  // "groupTitle" field.
  String? _groupTitle;
  String get groupTitle => _groupTitle ?? '';
  bool hasGroupTitle() => _groupTitle != null;

  // "about" field.
  String? _about;
  String get about => _about ?? '';
  bool hasAbout() => _about != null;

  // "groupPhoto" field.
  String? _groupPhoto;
  String get groupPhoto => _groupPhoto ?? '';
  bool hasGroupPhoto() => _groupPhoto != null;

  // "adminsitrators_ref" field.
  List<DocumentReference>? _adminsitratorsRef;
  List<DocumentReference> get adminsitratorsRef =>
      _adminsitratorsRef ?? const [];
  bool hasAdminsitratorsRef() => _adminsitratorsRef != null;

  // "modersator_ref" field.
  List<DocumentReference>? _modersatorRef;
  List<DocumentReference> get modersatorRef => _modersatorRef ?? const [];
  bool hasModersatorRef() => _modersatorRef != null;

  // "createdBy_ref" field.
  DocumentReference? _createdByRef;
  DocumentReference? get createdByRef => _createdByRef;
  bool hasCreatedByRef() => _createdByRef != null;

  // "isPrivate" field.
  bool? _isPrivate;
  bool get isPrivate => _isPrivate ?? false;
  bool hasIsPrivate() => _isPrivate != null;

  // "isBanned" field.
  bool? _isBanned;
  bool get isBanned => _isBanned ?? false;
  bool hasIsBanned() => _isBanned != null;

  // "comments_Ref" field.
  List<DocumentReference>? _commentsRef;
  List<DocumentReference> get commentsRef => _commentsRef ?? const [];
  bool hasCommentsRef() => _commentsRef != null;

  // "usersFollowing_Ref" field.
  List<DocumentReference>? _usersFollowingRef;
  List<DocumentReference> get usersFollowingRef =>
      _usersFollowingRef ?? const [];
  bool hasUsersFollowingRef() => _usersFollowingRef != null;

  void _initializeFields() {
    _groupID = snapshotData['groupID'] as String?;
    _dataCreated = snapshotData['dataCreated'] as DateTime?;
    _groupTitle = snapshotData['groupTitle'] as String?;
    _about = snapshotData['about'] as String?;
    _groupPhoto = snapshotData['groupPhoto'] as String?;
    _adminsitratorsRef = getDataList(snapshotData['adminsitrators_ref']);
    _modersatorRef = getDataList(snapshotData['modersator_ref']);
    _createdByRef = snapshotData['createdBy_ref'] as DocumentReference?;
    _isPrivate = snapshotData['isPrivate'] as bool?;
    _isBanned = snapshotData['isBanned'] as bool?;
    _commentsRef = getDataList(snapshotData['comments_Ref']);
    _usersFollowingRef = getDataList(snapshotData['usersFollowing_Ref']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('bizPages');

  static Stream<BizPagesRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => BizPagesRecord.fromSnapshot(s));

  static Future<BizPagesRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => BizPagesRecord.fromSnapshot(s));

  static BizPagesRecord fromSnapshot(DocumentSnapshot snapshot) =>
      BizPagesRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static BizPagesRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      BizPagesRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'BizPagesRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is BizPagesRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createBizPagesRecordData({
  String? groupID,
  DateTime? dataCreated,
  String? groupTitle,
  String? about,
  String? groupPhoto,
  DocumentReference? createdByRef,
  bool? isPrivate,
  bool? isBanned,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'groupID': groupID,
      'dataCreated': dataCreated,
      'groupTitle': groupTitle,
      'about': about,
      'groupPhoto': groupPhoto,
      'createdBy_ref': createdByRef,
      'isPrivate': isPrivate,
      'isBanned': isBanned,
    }.withoutNulls,
  );

  return firestoreData;
}

class BizPagesRecordDocumentEquality implements Equality<BizPagesRecord> {
  const BizPagesRecordDocumentEquality();

  @override
  bool equals(BizPagesRecord? e1, BizPagesRecord? e2) {
    const listEquality = ListEquality();
    return e1?.groupID == e2?.groupID &&
        e1?.dataCreated == e2?.dataCreated &&
        e1?.groupTitle == e2?.groupTitle &&
        e1?.about == e2?.about &&
        e1?.groupPhoto == e2?.groupPhoto &&
        listEquality.equals(e1?.adminsitratorsRef, e2?.adminsitratorsRef) &&
        listEquality.equals(e1?.modersatorRef, e2?.modersatorRef) &&
        e1?.createdByRef == e2?.createdByRef &&
        e1?.isPrivate == e2?.isPrivate &&
        e1?.isBanned == e2?.isBanned &&
        listEquality.equals(e1?.commentsRef, e2?.commentsRef) &&
        listEquality.equals(e1?.usersFollowingRef, e2?.usersFollowingRef);
  }

  @override
  int hash(BizPagesRecord? e) => const ListEquality().hash([
        e?.groupID,
        e?.dataCreated,
        e?.groupTitle,
        e?.about,
        e?.groupPhoto,
        e?.adminsitratorsRef,
        e?.modersatorRef,
        e?.createdByRef,
        e?.isPrivate,
        e?.isBanned,
        e?.commentsRef,
        e?.usersFollowingRef
      ]);

  @override
  bool isValidKey(Object? o) => o is BizPagesRecord;
}
