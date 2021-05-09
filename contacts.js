const fs = require('fs').promises
const path = require('path')
const shortid = require('shortid')

const contactsPath = path.relative('/', '/db/contacts.json')

async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    const parsedAllContacts = JSON.parse(allContacts)
    console.table(parsedAllContacts)
  } catch (error) {
    console.error(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    const parsedAllContacts = JSON.parse(allContacts)
    const contact = parsedAllContacts.find((c) => String(c.id) === contactId)
    console.log(contact)
  } catch (error) {
    console.error(error.message)
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    const parsedAllContacts = JSON.parse(allContacts)
    const removedContact = parsedAllContacts.filter(
      (c) => String(c.id) !== contactId
    )
    const removedContactForFs = JSON.stringify(removedContact)
    await fs.writeFile(contactsPath, removedContactForFs)
    console.log(
      'Contact removed! To view all contacts, enter the command: node index.js --action list'
    )
  } catch (error) {
    console.error(error.message)
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    const parsedAllContacts = JSON.parse(allContacts)
    parsedAllContacts.push({
      id: shortid.generate(),
      name,
      email,
      phone,
    })
    const addedContatctForFs = JSON.stringify(parsedAllContacts, null, 2)
    await fs.writeFile(contactsPath, addedContatctForFs)
    console.log(
      'Contact added! To view all contacts, enter the command: node index.js --action list'
    )
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact }
