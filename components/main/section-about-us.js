function SectionAboutUs() {
    return (
        <section class="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <div class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div class="lg:w-1/2">
                    <div class="md:h-full bg-cover lg:rounded-lg" style={{ backgroundImage: "url('/img/main/about-us.jpg')" }}></div>
                </div>

                <div class="px-6 py-12 lg:max-w-5xl lg:w-1/2 sm:w-full text-center">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Relax by listening online radio with us</h2>
                    <p class="mt-4 text-gray-600 dark:text-gray-400">We are all used to listening to the radio through a good old receiver on either AM or FM frequencies, but now, every radio station offers digital broadcasting on the Internet. We live in unique times when free Internet radio stations from around the world are just one button away. Radio stations offer a variety of programs, news and music in a wide range of styles and trends. Therefore, to help you listen to the radio online for free we endeavoured to gather all the stations of the world in one place. Come to our site or install our free application on your smartphone, and we will do our best to make it convenient for you to listen to your favorite radio station.</p>
                </div>
            </div>
        </section>
    );
}


export default SectionAboutUs;
