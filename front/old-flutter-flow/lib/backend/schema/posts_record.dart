import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class PostsRecord extends FirestoreRecord {
  PostsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "postID" field.
  String? _postID;
  String get postID => _postID ?? '';
  bool hasPostID() => _postID != null;

  // "dateCreated" field.
  DateTime? _dateCreated;
  DateTime? get dateCreated => _dateCreated;
  bool hasDateCreated() => _dateCreated != null;

  // "postedBy_ref" field.
  DocumentReference? _postedByRef;
  DocumentReference? get postedByRef => _postedByRef;
  bool hasPostedByRef() => _postedByRef != null;

  // "content" field.
  String? _content;
  String get content => _content ?? '';
  bool hasContent() => _content != null;

  // "photo" field.
  String? _photo;
  String get photo => _photo ?? '';
  bool hasPhoto() => _photo != null;

  // "video" field.
  String? _video;
  String get video => _video ?? '';
  bool hasVideo() => _video != null;

  // "likes" field.
  int? _likes;
  int get likes => _likes ?? 0;
  bool hasLikes() => _likes != null;

  // "likedBy_Users" field.
  List<DocumentReference>? _likedByUsers;
  List<DocumentReference> get likedByUsers => _likedByUsers ?? const [];
  bool hasLikedByUsers() => _likedByUsers != null;

  // "isPrivate" field.
  bool? _isPrivate;
  bool get isPrivate => _isPrivate ?? false;
  bool hasIsPrivate() => _isPrivate != null;

  // "group_Ref" field.
  DocumentReference? _groupRef;
  DocumentReference? get groupRef => _groupRef;
  bool hasGroupRef() => _groupRef != null;

  // "comments_Ref" field.
  List<DocumentReference>? _commentsRef;
  List<DocumentReference> get commentsRef => _commentsRef ?? const [];
  bool hasCommentsRef() => _commentsRef != null;

  void _initializeFields() {
    _postID = snapshotData['postID'] as String?;
    _dateCreated = snapshotData['dateCreated'] as DateTime?;
    _postedByRef = snapshotData['postedBy_ref'] as DocumentReference?;
    _content = snapshotData['content'] as String?;
    _photo = snapshotData['photo'] as String?;
    _video = snapshotData['video'] as String?;
    _likes = castToType<int>(snapshotData['likes']);
    _likedByUsers = getDataList(snapshotData['likedBy_Users']);
    _isPrivate = snapshotData['isPrivate'] as bool?;
    _groupRef = snapshotData['group_Ref'] as DocumentReference?;
    _commentsRef = getDataList(snapshotData['comments_Ref']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('posts');

  static Stream<PostsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => PostsRecord.fromSnapshot(s));

  static Future<PostsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => PostsRecord.fromSnapshot(s));

  static PostsRecord fromSnapshot(DocumentSnapshot snapshot) => PostsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static PostsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      PostsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'PostsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is PostsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createPostsRecordData({
  String? postID,
  DateTime? dateCreated,
  DocumentReference? postedByRef,
  String? content,
  String? photo,
  String? video,
  int? likes,
  bool? isPrivate,
  DocumentReference? groupRef,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'postID': postID,
      'dateCreated': dateCreated,
      'postedBy_ref': postedByRef,
      'content': content,
      'photo': photo,
      'video': video,
      'likes': likes,
      'isPrivate': isPrivate,
      'group_Ref': groupRef,
    }.withoutNulls,
  );

  return firestoreData;
}

class PostsRecordDocumentEquality implements Equality<PostsRecord> {
  const PostsRecordDocumentEquality();

  @override
  bool equals(PostsRecord? e1, PostsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.postID == e2?.postID &&
        e1?.dateCreated == e2?.dateCreated &&
        e1?.postedByRef == e2?.postedByRef &&
        e1?.content == e2?.content &&
        e1?.photo == e2?.photo &&
        e1?.video == e2?.video &&
        e1?.likes == e2?.likes &&
        listEquality.equals(e1?.likedByUsers, e2?.likedByUsers) &&
        e1?.isPrivate == e2?.isPrivate &&
        e1?.groupRef == e2?.groupRef &&
        listEquality.equals(e1?.commentsRef, e2?.commentsRef);
  }

  @override
  int hash(PostsRecord? e) => const ListEquality().hash([
        e?.postID,
        e?.dateCreated,
        e?.postedByRef,
        e?.content,
        e?.photo,
        e?.video,
        e?.likes,
        e?.likedByUsers,
        e?.isPrivate,
        e?.groupRef,
        e?.commentsRef
      ]);

  @override
  bool isValidKey(Object? o) => o is PostsRecord;
}
