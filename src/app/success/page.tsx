import Link from "next/link";
import * as motion from "framer-motion/client";

function SuccessPage() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl flex flex-col items-center">
      Your payment was successful. <br />
      Soon you will receive an email with details. <br />
      <b>Thank you!</b>
      <Link href='/' className="mt-8 text-accent">Return to Home</Link>
    </motion.section>
  );
}

export default SuccessPage;
