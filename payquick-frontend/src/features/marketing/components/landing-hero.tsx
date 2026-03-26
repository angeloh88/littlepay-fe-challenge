import { Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_MAIN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCumIOOhJprm2t8-QOS_oJx24eixuplUs-GqJAmhN8cQjE8_3lPi4Uu1_IBkSGVnNKD4St9UYkQ79EfD2XtN-i5TuoZ6q9HavXviaikali6wRW_J3pJV_b_ZHaIJBLr2mLVKkzyg4wzCKF_RyIEibbZUDudPZOMeUegaDM9pUyZKBRVN81RS7cXjDylsj5ppfI-eihmroUnB7PUe8C3iAWCm4G6ZEBF_ke0k7dsynywNQOQUeMgdnGlD19D3SsxJHCS2o6fl0rB1tHR";
const HERO_SMALL_TOP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIi68lPxS6J1hFyUoKQ98IrIp7qm_cXutoYAiLJLHB9H1epYJXlGydJiIpZztzDlA_Zm9kX4jxqeweFKzjRORWIPZ4Hb-ThvWNlha58eNO8IrjFfPyJlpJz6LqVUk1opPVd-MULECsaESVbuoIPH053eqzkCwY-JfOGWPDhqPE2mU5SmWQ3rnDYrLcodh-j6L096rjAaE6JQ6SHeV31s7q30TJ83jvY80Cvopi3d8Pw7a-8k_8Y8VQNXMwaBl4hSp-ClRP4qPzxz_l";
const HERO_SMALL_BOTTOM =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvpTPQye0Kzqgjypq2Xttgyvdpu-ssZfLQ7X2VUU1-gYikfOJpFCj83z2jpw0F0cWQVXuiw4_Xp8DT3RTIKSoSJShFaH8pqYBTAuKr2B54H5--CYtSic6MNo8pmnmrhHYjNMgLZW1nKEl3rsy22z8MRz0EYyMX4av7xLAK-3_V44yynScsyeP4LMF5avRrrbxIZaZe5Sjtb17V9rZFtXCtoQmv89-S9OavIdZSidncUMIlxqyZ2u31o9CN727JqyTZ9Q4R19Zj3rbg";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-8 pb-32 pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="z-10">
          <span className="mb-6 inline-block rounded-full bg-primary-fixed px-4 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-widest text-primary">
            Secure Global Transfers
          </span>
          <h1 className="mb-8 font-headline text-6xl font-extrabold leading-[1.1] tracking-tighter text-on-surface md:text-7xl">
            The Digital <br />
            <span className="text-primary-container">Vault.</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Experience institutional-grade security with the fluidity of modern
            design. PayQuick redefines how you send, receive, and manage your
            wealth across borders.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="editorial-shadow rounded-xl bg-linear-to-br from-primary to-primary-container px-8 py-4 text-lg font-bold text-on-primary transition-transform active:scale-95"
            >
              Open Free Account
            </Link>
            <Link
              href="#features"
              className="rounded-xl bg-secondary-container px-8 py-4 text-lg font-bold text-on-secondary-container transition-all hover:bg-opacity-90"
            >
              Explore Wealth
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-12 gap-4">
            <div className="relative col-span-8 aspect-4/5 overflow-hidden rounded-2xl editorial-shadow">
              <Image
                src={HERO_MAIN}
                alt="Minimal architectural structure with clean lines and soft blue lighting on glass surfaces"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl editorial-shadow">
                <Image
                  src={HERO_SMALL_TOP}
                  alt="Abstract digital artwork with glowing blue neural pathways"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl editorial-shadow">
                <Image
                  src={HERO_SMALL_BOTTOM}
                  alt="Finance professional reviewing digital charts on a monitor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                />
              </div>
            </div>
          </div>
          <div className="glass-surface editorial-shadow absolute -bottom-8 -left-8 max-w-[280px] rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <Shield className="h-6 w-6" aria-hidden strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold">Verified Secure</div>
                <div className="text-[0.6875rem] text-on-surface-variant">
                  AES-256 Encryption
                </div>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full w-3/4 bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
