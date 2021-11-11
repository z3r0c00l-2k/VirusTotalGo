package com.virustotalgo

import android.content.ContentResolver
import android.net.Uri
import java.io.ByteArrayOutputStream
import java.io.FileInputStream
import java.security.MessageDigest


object HashHelper {

    fun getFileHash(fileUri: Uri, contentResolver: ContentResolver): String {
        try {
            val mInputPFD = contentResolver.openFileDescriptor(fileUri, "r")
            val mContentFileDescriptor = mInputPFD?.fileDescriptor
            val fIS = FileInputStream(mContentFileDescriptor)
            val mGraphicBuffer = ByteArrayOutputStream()
            val buf = ByteArray(1024)
            while (true) {
                val readNum = fIS.read(buf)
                if (readNum == -1) break
                mGraphicBuffer.write(buf, 0, readNum)
            }
            return generateChecksum(mGraphicBuffer)
        } catch (e: Exception) {
            e.printStackTrace()
            return ""
        }

    }


    private fun generateChecksum(data: ByteArrayOutputStream): String {
        try {
            val digest: MessageDigest = MessageDigest.getInstance("SHA-256")
            val hash: ByteArray = digest.digest(data.toByteArray())
            return printableHexString(hash)
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return ""
    }

    private fun printableHexString(data: ByteArray): String {
        // Create Hex String
        val hexString: StringBuilder = StringBuilder()
        for (aMessageDigest: Byte in data) {
            var h: String = Integer.toHexString(0xFF and aMessageDigest.toInt())
            while (h.length < 2)
                h = "0$h"
            hexString.append(h)
        }
        return hexString.toString()
    }

}