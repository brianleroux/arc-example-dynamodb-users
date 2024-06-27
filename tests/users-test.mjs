import test from 'node:test'
import assert from 'node:assert'
import sandbox from '@architect/sandbox'
import arc from '@architect/functions'

test('env', t=> {
  assert(true)
})

test('sandbox.start', async t => {
  await sandbox.start({ quiet: true })
  assert(true)
})

test('has users table', async t => {
  let data = await arc.tables()
  assert(!!data.users)
})

test('can write a row to the users table', async t => {
  let data = await arc.tables()
  let user = await data.users.put({
    userID: 'xxx',
    email: 'b@brian.io'
  })
  assert(user.email)
})

test('can read a row by userID', async t => {
  let data = await arc.tables()
  let user = await data.users.get({
    userID: 'xxx',
  })
  assert(user.email)
  console.log(user)
})

test('can read a row by email', async t => {
  let data = await arc.tables()
  let res = await data.users.query({
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': 'b@brian.io'
    }
  })
  assert(res.Items.length === 1)
  console.log(res.Items[0])
})

test('sandbox.end', async t => {
  await sandbox.end()
  assert(true)
})
