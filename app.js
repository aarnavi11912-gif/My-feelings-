alert("app.js loaded ❤️");
alert("app.js loaded ❤️");/* =====================================================
   SUPABASE CONFIGURATION
===================================================== */

const SUPABASE_URL =
    "https://brotcqznzuchmqzqevjy.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_UD6-tboqgctR4KEiaEZzcw_8cLyWvNH";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   GLOBAL
===================================================== */

let currentUser = null;

const BUCKET = "love-memories";

let realtimeChannel = null;


/* =====================================================
   AUTH MESSAGE HELPER
===================================================== */

function setAuthMessage(message) {

    const element =
        document.getElementById("authMessage");

    if (element) {
        element.innerText = message;
    }
}


/* =====================================================
   SIGN UP
===================================================== */

async function signup() {

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");

    const email =
        emailElement?.value.trim();

    const password =
        passwordElement?.value;

    if (!email || !password) {

        setAuthMessage(
            "Please enter your email and password 💕"
        );

        return;
    }

    if (password.length < 6) {

        setAuthMessage(
            "Password must contain at least 6 characters."
        );

        return;
    }

    setAuthMessage(
        "Creating your little love world... 💗"
    );

    try {

        const { data, error } =
            await supabaseClient.auth.signUp({
                email,
                password
            });

        if (error) {
            throw error;
        }

        if (data.session) {

            currentUser =
                data.user;

            showHome();

            setupRealtime();

        } else {

            setAuthMessage(
                "Account created! Check your email to confirm it 💌"
            );

        }

    } catch (error) {

        console.error(error);

        setAuthMessage(
            error.message
        );

    }
}


/* =====================================================
   LOGIN
===================================================== */

async function login() {

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");

    const email =
        emailElement?.value.trim();

    const password =
        passwordElement?.value;

    if (!email || !password) {

        setAuthMessage(
            "Please enter your email and password 💕"
        );

        return;
    }

    setAuthMessage(
        "Opening our little world... 💕"
    );

    try {

        const { data, error } =
            await supabaseClient.auth.sign
