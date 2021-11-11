package com.virustotalgo

import android.content.pm.ApplicationInfo
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build

import com.facebook.react.bridge.*
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.virustotalgo.HashHelper.getFileHash

import java.io.File
import java.lang.Exception

import com.virustotalgo.Utility.convertIcon
import java.util.concurrent.locks.Condition

enum class AppsType {
    All, System, User
}

class GetInstalledAppsModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNInstalledApps"
    }

    @ReactMethod
    fun getApps(promise: Promise) {
        try {
            val list = createAppsList(AppsType.All)
            promise.resolve(list)
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }


    @ReactMethod
    fun getUserApps(promise: Promise) {
        try {
            val list = createAppsList(AppsType.User)
            promise.resolve(list)
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    @ReactMethod
    fun getSystemApps(promise: Promise) {
        try {
            val list = createAppsList(AppsType.System)
            promise.resolve(list)
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    @ReactMethod
    fun getFileSha256(fileUrl: String, promise: Promise) {
        try {
            val fileSha256 = getFileHash(Uri.fromFile(File(fileUrl)), reactContext.contentResolver)
            promise.resolve(fileSha256)
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }


    private fun createAppsList(appsType: AppsType): WritableArray? {
        val pm: PackageManager = reactContext.packageManager
        val pList = pm.getInstalledPackages(0)
        val list = Arguments.createArray()

        for (i in pList.indices) {
            val packageInfo = pList[i]
            val appInfo = Arguments.createMap()
            var appCheckCondition: Boolean = true
            if (appsType == AppsType.System) {
                appCheckCondition =
                    packageInfo.applicationInfo.flags and ApplicationInfo.FLAG_SYSTEM != 0
            } else if (appsType == AppsType.User) {
                appCheckCondition =
                    packageInfo.applicationInfo.flags and ApplicationInfo.FLAG_SYSTEM == 0
            }
            if (appCheckCondition) {
                appInfo.putString("packageName", packageInfo.packageName)
                appInfo.putString("versionName", packageInfo.versionName)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    appInfo.putDouble("versionCode", packageInfo.longVersionCode.toDouble())
                } else {
                    appInfo.putDouble("versionCode", packageInfo.versionCode.toDouble())
                }
                appInfo.putDouble("firstInstallTime", packageInfo.firstInstallTime.toDouble())
                appInfo.putDouble("lastUpdateTime", packageInfo.lastUpdateTime.toDouble())
                appInfo.putString(
                    "appName",
                    (packageInfo.applicationInfo.loadLabel(reactContext.packageManager) as String).trim { it <= ' ' })
                val icon =
                    reactContext.packageManager.getApplicationIcon(packageInfo.applicationInfo)
                appInfo.putString(
                    "icon",
                    convertIcon(icon)
                )
                val apkDir = packageInfo.applicationInfo.publicSourceDir
                appInfo.putString("apkDir", apkDir)
                val file = File(apkDir)
                val size: Double = file.length().toDouble()
                appInfo.putDouble("size", size)
                appInfo.putBoolean(
                    "isSystemApp",
                    packageInfo.applicationInfo.flags and ApplicationInfo.FLAG_SYSTEM != 0
                )
                list.pushMap(appInfo)
            }
        }
        return list
    }
}