import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class GroupsRecord extends FirestoreRecord {
  GroupsRecord._(
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

  // "members" field.
  List<DocumentReference>? _members;
  List<DocumentReference> get members => _members ?? const [];
  bool hasMembers() => _members != null;

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

  // "posts_Ref" field.
  List<DocumentReference>? _postsRef;
  List<DocumentReference> get postsRef => _postsRef ?? const [];
  bool hasPostsRef() => _postsRef != null;

  void _initializeFields() {
    _groupID = snapshotData['groupID'] as String?;
    _dataCreated = snapshotData['dataCreated'] as DateTime?;
    _groupTitle = snapshotData['groupTitle'] as String?;
    _about = snapshotData['about'] as String?;
    _groupPhoto = snapshotData['groupPhoto'] as String?;
    _members = getDataList(snapshotData['members']);
    _adminsitratorsRef = getDataList(snapshotData['adminsitrators_ref']);
    _modersatorRef = getDataList(snapshotData['modersator_ref']);
    _createdByRef = snapshotData['createdBy_ref'] as DocumentReference?;
    _isPrivate = snapshotData['isPrivate'] as bool?;
    _isBanned = snapshotData['isBanned'] as bool?;
    _commentsRef = getDataList(snapshotData['comments_Ref']);
    _postsRef = getDataList(snapshotData['posts_Ref']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('groups');

  static Stream<GroupsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => GroupsRecord.fromSnapshot(s));

  static Future<GroupsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => GroupsRecord.fromSnapshot(s));

  static GroupsRecord fromSnapshot(DocumentSnapshot snapshot) => GroupsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static GroupsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      GroupsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'GroupsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is GroupsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createGroupsRecordData({
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

class GroupsRecordDocumentEquality implements Equality<GroupsRecord> {
  const GroupsRecordDocumentEquality();

  @override
  bool equals(GroupsRecord? e1, GroupsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.groupID == e2?.groupID &&
        e1?.dataCreated == e2?.dataCreated &&
        e1?.groupTitle == e2?.groupTitle &&
        e1?.about == e2?.about &&
        e1?.groupPhoto == e2?.groupPhoto &&
        listEquality.equals(e1?.members, e2?.members) &&
        listEquality.equals(e1?.adminsitratorsRef, e2?.adminsitratorsRef) &&
        listEquality.equals(e1?.modersatorRef, e2?.modersatorRef) &&
        e1?.createdByRef == e2?.createdByRef &&
        e1?.isPrivate == e2?.isPrivate &&
        e1?.isBanned == e2?.isBanned &&
        listEquality.equals(e1?.commentsRef, e2?.commentsRef) &&
        listEquality.equals(e1?.postsRef, e2?.postsRef);
  }

  @override
  int hash(GroupsRecord? e) => const ListEquality().hash([
        e?.groupID,
        e?.dataCreated,
        e?.groupTitle,
        e?.about,
        e?.groupPhoto,
        e?.members,
        e?.adminsitratorsRef,
        e?.modersatorRef,
        e?.createdByRef,
        e?.isPrivate,
        e?.isBanned,
        e?.commentsRef,
        e?.postsRef
      ]);

  @override
  bool isValidKey(Object? o) => o is GroupsRecord;
}
