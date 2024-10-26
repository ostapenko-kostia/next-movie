import * as motion from "framer-motion/client";
import Link from "next/link";

function Footer() {
  return (
    <motion.footer initial={{ translateY: 100 }} animate={{ translateY: 0 }} className="bg-bg-color-alt w-full mt-auto py-5 max-xs:px-5">
      <div className="container flex items-center max-sm:flex-col max-sm:gap-5 max-sm:text-center justify-between mx-auto h-full text-sm text-secondary">
        <p>© 2024 Next Movie. All rights reserved.</p>
        <p>
          Frontend:{" "}
          <Link className="text-accent" href="https://t.me/khos_streks" target="_blank">
            @khos_streks
          </Link>
          <br />
          Backend:{" "}
          <Link className="text-accent" href="https://t.me/Limon4ik7" target="_blank">
            @lim0n4ik
          </Link>
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
