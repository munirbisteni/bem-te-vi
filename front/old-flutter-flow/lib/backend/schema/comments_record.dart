import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class CommentsRecord extends FirestoreRecord {
  CommentsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "commentID" field.
  String? _commentID;
  String get commentID => _commentID ?? '';
  bool hasCommentID() => _commentID != null;

  // "dataCreated" field.
  DateTime? _dataCreated;
  DateTime? get dataCreated => _dataCreated;
  bool hasDataCreated() => _dataCreated != null;

  // "content" field.
  String? _content;
  String get content => _content ?? '';
  bool hasContent() => _content != null;

  // "likes" field.
  int? _likes;
  int get likes => _likes ?? 0;
  bool hasLikes() => _likes != null;

  // "likedBy_Users" field.
  List<DocumentReference>? _likedByUsers;
  List<DocumentReference> get likedByUsers => _likedByUsers ?? const [];
  bool hasLikedByUsers() => _likedByUsers != null;

  // "post_Ref" field.
  DocumentReference? _postRef;
  DocumentReference? get postRef => _postRef;
  bool hasPostRef() => _postRef != null;

  // "group_Ref" field.
  DocumentReference? _groupRef;
  DocumentReference? get groupRef => _groupRef;
  bool hasGroupRef() => _groupRef != null;

  // "bizPage_ref" field.
  DocumentReference? _bizPageRef;
  DocumentReference? get bizPageRef => _bizPageRef;
  bool hasBizPageRef() => _bizPageRef != null;

  // "marketItem_ref" field.
  DocumentReference? _marketItemRef;
  DocumentReference? get marketItemRef => _marketItemRef;
  bool hasMarketItemRef() => _marketItemRef != null;

  // "createdBy_ref" field.
  DocumentReference? _createdByRef;
  DocumentReference? get createdByRef => _createdByRef;
  bool hasCreatedByRef() => _createdByRef != null;

  void _initializeFields() {
    _commentID = snapshotData['commentID'] as String?;
    _dataCreated = snapshotData['dataCreated'] as DateTime?;
    _content = snapshotData['content'] as String?;
    _likes = castToType<int>(snapshotData['likes']);
    _likedByUsers = getDataList(snapshotData['likedBy_Users']);
    _postRef = snapshotData['post_Ref'] as DocumentReference?;
    _groupRef = snapshotData['group_Ref'] as DocumentReference?;
    _bizPageRef = snapshotData['bizPage_ref'] as DocumentReference?;
    _marketItemRef = snapshotData['marketItem_ref'] as DocumentReference?;
    _createdByRef = snapshotData['createdBy_ref'] as DocumentReference?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('comments');

  static Stream<CommentsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => CommentsRecord.fromSnapshot(s));

  static Future<CommentsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => CommentsRecord.fromSnapshot(s));

  static CommentsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      CommentsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static CommentsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      CommentsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'CommentsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is CommentsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createCommentsRecordData({
  String? commentID,
  DateTime? dataCreated,
  String? content,
  int? likes,
  DocumentReference? postRef,
  DocumentReference? groupRef,
  DocumentReference? bizPageRef,
  DocumentReference? marketItemRef,
  DocumentReference? createdByRef,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'commentID': commentID,
      'dataCreated': dataCreated,
      'content': content,
      'likes': likes,
      'post_Ref': postRef,
      'group_Ref': groupRef,
      'bizPage_ref': bizPageRef,
      'marketItem_ref': marketItemRef,
      'createdBy_ref': createdByRef,
    }.withoutNulls,
  );

  return firestoreData;
}

class CommentsRecordDocumentEquality implements Equality<CommentsRecord> {
  const CommentsRecordDocumentEquality();

  @override
  bool equals(CommentsRecord? e1, CommentsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.commentID == e2?.commentID &&
        e1?.dataCreated == e2?.dataCreated &&
        e1?.content == e2?.content &&
        e1?.likes == e2?.likes &&
        listEquality.equals(e1?.likedByUsers, e2?.likedByUsers) &&
        e1?.postRef == e2?.postRef &&
        e1?.groupRef == e2?.groupRef &&
        e1?.bizPageRef == e2?.bizPageRef &&
        e1?.marketItemRef == e2?.marketItemRef &&
        e1?.createdByRef == e2?.createdByRef;
  }

  @override
  int hash(CommentsRecord? e) => const ListEquality().hash([
        e?.commentID,
        e?.dataCreated,
        e?.content,
        e?.likes,
        e?.likedByUsers,
        e?.postRef,
        e?.groupRef,
        e?.bizPageRef,
        e?.marketItemRef,
        e?.createdByRef
      ]);

  @override
  bool isValidKey(Object? o) => o is CommentsRecord;
}
