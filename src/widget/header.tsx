import { Popover } from "@/component";
import config from "@/config";
import { useI18n } from "@/i18n";

const { githubRepoAddr, blogAddr } = config;

const languages = {
  zhCN: "简体中文",
  zhTW: "正體中文",
  en: "English",
};

const PageHeader = () => {
  const { lang: currentLang, setLang } = useI18n();

  return (
    <div class="flex justify-between items-center fixed top-0 left-0 right-0 w-screen shadow h-12 px-10 z-40 bg-white">
      <p class="text-lg text font-bold">
        <span class="text-red-500">FANCY</span>
        <span>TOOLS</span>
      </p>
      <div>
        {/* language */}
        <Popover
          content={
            <ul class="">
              {Object.keys(languages).map((lang: string) => {
                const text = Reflect.get(languages, lang);
                return (
                  <li
                    key={lang}
                    class="border-b cursor-pointer py-2 text-sm hover:text-red-400 transition-all"
                    onClick={() => setLang(lang)}
                  >
                    {lang === currentLang && (
                      <div class="w-2 h-2 rounded-full bg-red-400 inline-block mr-2" />
                    )}
                    {text}
                  </li>
                );
              })}
            </ul>
          }
        >
          <a class="bg-language w-6 h-6 bg-contain cursor-pointer inline-block mx-2" />
        </Popover>
        {/* github */}
        <a
          target="_blank"
          href={blogAddr}
          class="bg-github w-6 h-6 bg-contain cursor-pointer inline-block mx-2"
        />
        {/* website */}
        <a
          target="_blank"
          href={blogAddr}
          class="bg-website w-6 h-6 bg-contain cursor-pointer inline-block mx-2"
        />
      </div>
    </div>
  );
};

export default PageHeader;
