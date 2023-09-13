// Import the functions you need from the SDKs you need
import admin from 'firebase-admin'

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp()
}
