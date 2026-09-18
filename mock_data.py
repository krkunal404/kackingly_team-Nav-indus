# mock_data.py
import json

LOGIN_UI = {
    "class": "android.widget.FrameLayout",
    "children": [
        {"class": "android.widget.TextView", "text": "DemoShop Login", "resource-id": "title"},
        {"class": "android.widget.EditText", "text": "Username", "resource-id": "username_input", "editable": True},
        {"class": "android.widget.EditText", "text": "Password", "resource-id": "password_input", "editable": True},
        {"class": "android.widget.Button", "text": "Login", "resource-id": "login_btn", "clickable": True}
    ]
}

HOME_UI = {
    "class": "android.widget.FrameLayout",
    "children": [
        {"class": "android.widget.TextView", "text": "DemoShop Home", "resource-id": "title"},
        {"class": "android.widget.TextView", "text": "Welcome back", "resource-id": "welcome_msg"},
        {"class": "android.widget.Button", "text": "Products", "resource-id": "nav_products", "clickable": True},
        {"class": "android.widget.Button", "text": "Profile", "resource-id": "nav_profile", "clickable": True},
        {"class": "android.widget.Button", "text": "Settings", "resource-id": "nav_settings", "clickable": True}
    ]
}

SETTINGS_UI = {
    "class": "android.widget.FrameLayout",
    "children": [
        {"class": "android.widget.TextView", "text": "Settings", "resource-id": "title"},
        {"class": "android.widget.Switch", "text": "Notifications", "resource-id": "toggle_notif", "clickable": True},
        {"class": "android.widget.Switch", "text": "Dark Mode", "resource-id": "toggle_dark", "clickable": True},
        {"class": "android.widget.Button", "text": "Back to Home", "resource-id": "btn_back", "clickable": True}
    ]
}

PRODUCTS_UI = {
    "class": "android.widget.FrameLayout",
    "children": [
        {"class": "android.widget.TextView", "text": "Products", "resource-id": "title"},
        {"class": "android.widget.Button", "text": "Shoes ($50)", "resource-id": "prod_1", "clickable": True},
        {"class": "android.widget.Button", "text": "Hat ($20)", "resource-id": "prod_2", "clickable": True},
        {"class": "android.widget.Button", "text": "Back to Home", "resource-id": "btn_back", "clickable": True}
    ]
}
