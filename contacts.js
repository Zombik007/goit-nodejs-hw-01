const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const pathContacts = path.join(__dirname, 'contacts.json')

const readContacts = async () => {
  try {
    const result = await fs.readFile(
      path.join(__dirname, 'contacts.json'),
      'utf8',
    )
    const contacts = JSON.parse(result)
    return contacts
  } catch (error) {
    console.error
  }
}

function listContacts() {
  return readContacts()
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts()
    const [result] = contacts.filter(contact => contact.id === contactId)
    return result
  } catch (error) {
    console.error
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts()
    const newContacts = contacts.filter(contact => contact.id !== contactId)
    await fs.writeFile(
      pathContacts,
      JSON.stringify(newContacts, null, 2),
      'utf8',
    )
    return newContacts
  } catch (error) {
    console.error
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts()
    const newContact = { id: crypto.randomUUID(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2))
    return newContact
  } catch (error) {
    console.error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
