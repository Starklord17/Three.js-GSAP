import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <section>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">Find an Apple Store </span>
            or <span className="underline text-blue">other retailer</span> near
            you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 000800-040-1966
          </p>
        </section>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <section className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copyright @ 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <a
                key={link.text}
                href={link.url}
                target="_blank" // Opens the link in a new window/tab
                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                className="font-semibold text-gray text-xs"
              >
                {link.text}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
