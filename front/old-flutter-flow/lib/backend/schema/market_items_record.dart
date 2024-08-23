import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class MarketItemsRecord extends FirestoreRecord {
  MarketItemsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "itemID" field.
  String? _itemID;
  String get itemID => _itemID ?? '';
  bool hasItemID() => _itemID != null;

  // "dateCreated" field.
  DateTime? _dateCreated;
  DateTime? get dateCreated => _dateCreated;
  bool hasDateCreated() => _dateCreated != null;

  // "createdBy_Ref" field.
  DocumentReference? _createdByRef;
  DocumentReference? get createdByRef => _createdByRef;
  bool hasCreatedByRef() => _createdByRef != null;

  // "title" field.
  String? _title;
  String get title => _title ?? '';
  bool hasTitle() => _title != null;

  // "desccription" field.
  String? _desccription;
  String get desccription => _desccription ?? '';
  bool hasDesccription() => _desccription != null;

  // "photo" field.
  String? _photo;
  String get photo => _photo ?? '';
  bool hasPhoto() => _photo != null;

  // "avaliableQuantity" field.
  int? _avaliableQuantity;
  int get avaliableQuantity => _avaliableQuantity ?? 0;
  bool hasAvaliableQuantity() => _avaliableQuantity != null;

  // "price" field.
  int? _price;
  int get price => _price ?? 0;
  bool hasPrice() => _price != null;

  // "isAvaliable" field.
  bool? _isAvaliable;
  bool get isAvaliable => _isAvaliable ?? false;
  bool hasIsAvaliable() => _isAvaliable != null;

  // "comments_Ref" field.
  List<DocumentReference>? _commentsRef;
  List<DocumentReference> get commentsRef => _commentsRef ?? const [];
  bool hasCommentsRef() => _commentsRef != null;

  // "purchastedBy_Users" field.
  List<DocumentReference>? _purchastedByUsers;
  List<DocumentReference> get purchastedByUsers =>
      _purchastedByUsers ?? const [];
  bool hasPurchastedByUsers() => _purchastedByUsers != null;

  void _initializeFields() {
    _itemID = snapshotData['itemID'] as String?;
    _dateCreated = snapshotData['dateCreated'] as DateTime?;
    _createdByRef = snapshotData['createdBy_Ref'] as DocumentReference?;
    _title = snapshotData['title'] as String?;
    _desccription = snapshotData['desccription'] as String?;
    _photo = snapshotData['photo'] as String?;
    _avaliableQuantity = castToType<int>(snapshotData['avaliableQuantity']);
    _price = castToType<int>(snapshotData['price']);
    _isAvaliable = snapshotData['isAvaliable'] as bool?;
    _commentsRef = getDataList(snapshotData['comments_Ref']);
    _purchastedByUsers = getDataList(snapshotData['purchastedBy_Users']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('marketItems');

  static Stream<MarketItemsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => MarketItemsRecord.fromSnapshot(s));

  static Future<MarketItemsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => MarketItemsRecord.fromSnapshot(s));

  static MarketItemsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      MarketItemsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static MarketItemsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      MarketItemsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'MarketItemsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is MarketItemsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createMarketItemsRecordData({
  String? itemID,
  DateTime? dateCreated,
  DocumentReference? createdByRef,
  String? title,
  String? desccription,
  String? photo,
  int? avaliableQuantity,
  int? price,
  bool? isAvaliable,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'itemID': itemID,
      'dateCreated': dateCreated,
      'createdBy_Ref': createdByRef,
      'title': title,
      'desccription': desccription,
      'photo': photo,
      'avaliableQuantity': avaliableQuantity,
      'price': price,
      'isAvaliable': isAvaliable,
    }.withoutNulls,
  );

  return firestoreData;
}

class MarketItemsRecordDocumentEquality implements Equality<MarketItemsRecord> {
  const MarketItemsRecordDocumentEquality();

  @override
  bool equals(MarketItemsRecord? e1, MarketItemsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.itemID == e2?.itemID &&
        e1?.dateCreated == e2?.dateCreated &&
        e1?.createdByRef == e2?.createdByRef &&
        e1?.title == e2?.title &&
        e1?.desccription == e2?.desccription &&
        e1?.photo == e2?.photo &&
        e1?.avaliableQuantity == e2?.avaliableQuantity &&
        e1?.price == e2?.price &&
        e1?.isAvaliable == e2?.isAvaliable &&
        listEquality.equals(e1?.commentsRef, e2?.commentsRef) &&
        listEquality.equals(e1?.purchastedByUsers, e2?.purchastedByUsers);
  }

  @override
  int hash(MarketItemsRecord? e) => const ListEquality().hash([
        e?.itemID,
        e?.dateCreated,
        e?.createdByRef,
        e?.title,
        e?.desccription,
        e?.photo,
        e?.avaliableQuantity,
        e?.price,
        e?.isAvaliable,
        e?.commentsRef,
        e?.purchastedByUsers
      ]);

  @override
  bool isValidKey(Object? o) => o is MarketItemsRecord;
}
