<template>
    <div class="student-layout" @click="closeNav">
        <header>
            <router-link to="/student">
                <div class="page-logo--role">
                    <img :src="logo" :alt="altLogo">
                </div>
            </router-link>

            <nav class="original-nav">
                <ul>
                    <li>
                        <router-link class="router-link" to="/student" exact-active-class="router-link-active">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router-link" to="/student/questions" exact-active-class="router-link-active">
                            Questions
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router-link" to="/student/tags" exact-active-class="router-link-active">
                            Tags
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router-link" to="/student/profile" exact-active-class="router-link-active">
                            Profile
                        </router-link>
                    </li>
                </ul>
            </nav>

            <div class="auth--nav-icon">
                <div class="login-register-logout">
                    <div class="authen-logout" v-if="isAuthenticated">
                        <p>
                            Welcome, {{ currentUser ? currentUser.name || currentUser.email : '' }}
                        </p>
                        <button @click="logout">Logout</button>
                    </div>
                    <div class="login-register" v-else>
                        <router-link :to="{ path: '/login'}" class="auth-link">
                            Sign in
                        </router-link>
                        <router-link :to="{ path: '/register' }" class="auth-link">
                            Sign up
                        </router-link>
                    </div>
                </div>
    
                <div class="nav-bar-btn" id="bar-btn" @click="onClickBarIcon">
                    <i class="fa-solid fa-layer-group fa-xl"></i>
                </div>
            </div>

            <nav class="bar-icon--nav" id="nav--bar-icon" @click="closeNav">
                <ul class="nav-list">
                    <li class="nav-items">
                        <router-link class="router-link" to="/student" exact-active-class="nav-router-link-active">
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li class="nav-items">
                        <router-link class="router-link" to="/student/questions" exact-active-class="nav-router-link-active">
                            <span>Questions</span>
                        </router-link>
                    </li>
                    <li class="nav-items">
                        <router-link class="router-link" to="/student/tags" exact-active-class="nav-router-link-active">
                            <span>Tags</span>
                        </router-link>
                    </li>
                    <li class="nav-items">
                        <router-link class="router-link" to="/student/profile" exact-active-class="nav-router-link-active">
                            <span>Profile</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="content-wrapper">
            <main>
                <router-view/>
            </main>
    
            <footer>
                &copy; 2025 Q&Aespa System
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'StudentLayout',
        data() {
            return {
                logo: 'https://betterthingsbyaespa.com/images/logo-2.webp',
                altLogo: 'Logo',
                isNavVisible: false
            }
        },
        computed: {
            ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
        },
        methods: {
            onClickBarIcon: function(event) {
                event.stopPropagation();

                this.isNavVisible = !this.isNavVisible;

                const barBtn = document.getElementById('bar-btn')
                const navBarIcon = document.getElementById('nav--bar-icon');

                if (this.isNavVisible) {
                    navBarIcon.style.display = 'flex';
                    barBtn.style.color = 'var(--secondary-color)';
                } else {
                    navBarIcon.style.display = 'none';
                    barBtn.style.color = 'var(--secondary-text-color)';
                }  
            },
            closeNav: function() {
                if (this.isNavVisible) {
                    this.isNavVisible = false;
                    const barBtn = document.getElementById('bar-btn')
                    const navBarIcon = document.getElementById('nav--bar-icon');
                    navBarIcon.style.display = 'none';
                    barBtn.style.color = 'var(--secondary-text-color)';
                }
            },
            logout() {
                this.$store.dispatch('auth/logout');
            }
        },
        mounted() {
            const navBarIcon = document.getElementById('nav--bar-icon');
            navBarIcon.style.display = 'none';

            document.addEventListener('click', this.closeNav);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.closeNav);
        }
    }    
</script>

<style>
    .student-layout {
        --text-color: #000;
        --secondary-text-color: #fff;
        --secondary-color: #8BCAD9;
        --background-color: #333;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        color: var(--text-color);
    }

    .student-layout header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--background-color);
        padding: 1em;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
    }

    .student-layout header .page-logo--role {
        display: flex;
        align-items: flex-start;
    }

    .student-layout header .page-logo--role img {
        width: 100px;
        height: 40px;
    }

    .student-layout header .page-logo--role img:hover {
        opacity: 0.8;
    }

    .student-layout header .page-logo--role span {
        color: var(--secondary-color);
        font-size: 13px;
        font-weight: bold;
        align-self: flex-start;
    }

    .student-layout header nav.original-nav {
        display: flex;
        margin-left: 7.5em;
    }

    .auth--nav-icon {
        display: flex;
    }

    .login-register-logout {
        display: flex;
        align-items: center;
    }

    .authen-logout {
        display: flex;
        align-items: center;
        gap: 1em;
    }

    .authen-logout p {
        color: var(--secondary-text-color);
        font-size: 0.9em;
    }

    .authen-logout button {
        background-color: var(--secondary-color);
        color: var(--background-color);
        border: none;
        padding: 0.5em 1em;
        border-radius: 0.3em;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }

    .authen-logout button:hover {
        opacity: 0.8;
        transform: scale(1.05);
    }

    .login-register {
        display: flex;
        gap: 1em;
    }

    .auth-link {
        color: var(--secondary-text-color);
        padding: 0.5em 1em;
        border-radius: 0.3em;
        transition: all 0.3s ease;
    }

    .auth-link:first-child, .auth-link:last-child:hover {
        background-color: transparent;
        border: 1px solid var(--secondary-color);
        transition: all 0.3s ease-in-out;
    }

    .auth-link:last-child,.auth-link:last-child:hover {
        background-color: var(--secondary-color);
        border: 0 solid var(--secondary-color);
        color: var(--background-color);
        font-weight: bold;
    }

    .auth-link:hover {
        opacity: 0.9;
        transform: translateY(-3px);
    }

    .student-layout header nav ul {
        list-style-type: none;
        display: flex;
    }

    .student-layout header nav ul li .router-link {
        padding: 0.8em 1.25em;
        color: var(--secondary-text-color);
        border-bottom: 0.1em solid var(--header-background-color) ;
        transition: all 0.3s ease-in-out;
    }

    .student-layout header nav ul li .router-link:hover {
        border-bottom: 0.1em solid var(--secondary-color);
        color: var(--secondary-color);
    }

    .student-layout header nav ul li .router-link-active {
        border-bottom: 0.1em solid var(--secondary-color);
        color: var(--secondary-color);
    }

    .student-layout .content-wrapper {
        margin-top: calc(2em + 40px)
    }

    .student-layout .content-wrapper main {
        min-height: 80vh;
        margin: 1em 0 2em;
    }

    .student-layout .content-wrapper footer {
        background-color: var(--background-color);
        width: 100%;
        color: var(--secondary-text-color);
        padding: 1em;
    }

    .student-layout header nav.bar-icon--nav,
    .nav-bar-btn {
        display: none;
    }    
    
    @media screen and (max-width: 1024px) {
        .student-layout header nav.original-nav {
            display: none;
        }

        .nav-bar-btn {
            display: flex;
            color: var(--secondary-text-color);
            padding: 1em 0.25em;
            cursor: pointer;
        }
        
        .nav-bar-btn i {
            color: inherit;
        }

        .nav-bar-btn:hover,
        .nav-bar-btn-active {
            color: #8BCAD9;
        }

        .student-layout header nav.bar-icon--nav{
            position: absolute;
            top: calc(2em + 40px);
            background-color: var(--background-color);
            left: 0;
            margin-top: 0;
            width: 100%;
            border-radius:  0 0 1em 0;
        }

        .student-layout header nav.bar-icon--nav .nav-list {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .student-layout header nav.bar-icon--nav .nav-list .nav-items {
            width: 100%;
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .router-link {
            text-align: left;
            display: block;
            width: 100%;
            padding: 1em;
            border-left: 0.1em solid var(--background-color);
            transition: all 0.3s ease-in-out;
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .router-link span {
            color: var(--secondary-text-color);
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .router-link:hover {
            border-color: #8BCAD9;
            border-left: 0.3em solid #8BCAD9;
            border-radius: 1em 0 1em 0;
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .router-link:hover span {
            color: #8BCAD9;
            font-weight: 600;
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .nav-router-link-active {
            border-color: #8BCAD9;
            border-left: 0.3em solid #8BCAD9;
            border-bottom: 0.1em solid #8BCAD9;
            border-radius: 1em 0 1em 0;
            color: #8BCAD9;
            font-weight: 600;
        }

        .student-layout header nav.bar-icon--nav .nav-list 
        .nav-items .nav-router-link-active span {
            color: inherit;
        }
    }

    @media screen and (max-width: 768px) {
        .login-register-logout {
            margin-right: 1em;
        }
        
        .authen-logout {
            gap: 0.5em;
        }
        
        .login-register {
            gap: 0.5em;
        }
        
        .auth-link {
            text-align: center;
            font-size: 0.9em;
            padding: 0.4em 0.8em;
        }
    }

    @media screen and (max-width: 480px) {
        .login-register-logout {
            position: absolute;
            top: calc(2em + 40px);
            right: 0;
            background-color: var(--background-color);
            padding: 1em;
            border-radius: 0 0 0 1em;
            z-index: 999;
        }
        
        .student-layout header {
            flex-wrap: wrap;
        }
    }
</style>