function Footer({ contactUsLink }) {
    if (contactUsLink === undefined) {
        throw Error('Contact us link does not exist!')
    }
    return (
        <footer class="flex justify-center px-4 text-gray-800 bg-white dark:text-white dark:bg-gray-800">
            <div class="container py-6">

                <section class="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
                    <div class="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
                        <div class="px-6 py-6 md:px-8 md:py-0">
                            <h2 class="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Sign Up For <span class="text-blue-600 dark:text-blue-400 md:text-blue-300">Project</span> Updates</h2>

                            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur obcaecati odio</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                        <form>
                            <div class="flex flex-col overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row">
                                <input class="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" />

                                <button class="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">subscribe</button>
                            </div>
                        </form>
                    </div>
                </section>

                <hr class="h-px mt-6 border-gray-300 border-none dark:bg-gray-700" />

                <div class="flex flex-col items-center justify-between mt-6 md:flex-row">
                    <div>
                        <a href="/" class="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">OnlineRadioSearch.com</a>
                    </div>
                    <div class="flex mt-4 md:m-0">
                        <div class="-mx-4">
                            <a href="#" class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">About</a>
                            <a href="#" class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">Blog</a>
                            <a href="#" class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">News</a>
                            <a href={contactUsLink} target="_blank" class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
