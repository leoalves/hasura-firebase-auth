export const addUser = `
 mutation addUser($uid: String, $email: String, $name: String) {
  insert_user(objects: [{firebase_id: $uid, email: $email, name: $name}]) {
    affected_rows
  }
}
`
