<template>
    <div class="main">
        <header class="header">
            <label class="header_title">Frontend Development Challenge #1</label>
            <ul class="header_items">
                <li>
                    <Icon name="bell"></Icon>
                </li>
                <li>
                    <Icon size="2.5em" name="person_circle"></Icon>
                </li>
            </ul>
        </header>
        
        <div class="content">
            <slot />
        </div>
        
        <footer class="footer">
            <div class="footer_section1">
                <div class="footer_section1_image-container">
                    <img src="/img/ecv_logo.png" alt="ECV Logo" />
                </div>
            </div>
            <div class="footer_section2">
                <ul class="footer_section2-items">
                    <li class="footer_section2-items-header">
                        <label>Sitemap</label>
                    </li>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div class="footer_section2">
                <ul class="footer_section2-items">
                    <li class="footer_section2-items-header">
                        <label>Socials</label>
                    </li>
                    <li>Facebook</li>
                    <li>Linkedin</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div class="footer_section3">
                <div class="footer_section3_top">
                    <label class="footer_section3_top-title">Head Office</label>
                    <span>
                        Xilliams Corner Wine © 2017. 1112 A Market St # Ste B22, Charlottesville, CA 45565
                    </span>
                </div>
                <div class="footer_section3_bottom">
                    <label>News letter</label>
                    <div class="relative">
                        <input type="text" class="footer_section3_bottom-input w-full" placeholder="Enter text">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Icon name="email_outline"></Icon>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    .main {
        height: auto;
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;

        .header {
            height: 10vh;
            width: 100%;
            padding: 0 1.5rem;
            color: #FFFFFF;
            background-color: #1D50A2;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            &_title {
                width: 50%;
            }

            &_items {
                width: 50%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                gap: 1rem;
            }
        }

        .content {
            height: auto;
            min-height: 85vh;
            width: 100%;
            padding: 0 1.5rem;
            background-color: whitesmoke;
        }

        .footer {
            height: 40vh;
            width: 100%;
            color: #FFFFFF;
            background-color: #1D50A2;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;

            &_section1 {
                height: 80%;
                width: 20%;
                display: flex;
                justify-content: flex-end;
            }

            &_section2 {
                height: 80%;
                width: 10%;
                display: flex;
                flex-direction: row;
                justify-content: center;

                &-items {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    font-size: 13px;
                    font-weight: 300;

                    &-header {
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
            }

            &_section3 {
                height: 80%;
                width: 30%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                &_top {
                    height: 60%;
                    width: 70%;
                    font-size: 13px;
                    font-weight: 300;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    gap: 0.75rem;

                    &-title {
                        font-size: 14px;
                        font-weight: 600;
                    }
                }

                &_bottom {
                    height: 40%;
                    width: 70%;
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    font-weight: 600;

                    &-input {
                        height: 7vh;
                        font-weight: 400;
                        background-color: transparent;
                        border: none;
                        border-bottom: 1px solid #ffffff40;
                        outline: none;
                    }
                }
            }
        }
    }
</style>