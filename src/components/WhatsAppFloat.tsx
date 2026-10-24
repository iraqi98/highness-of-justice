import { getTranslations } from 'next-intl/server';
import { whatsappUrl } from '@/config/site';
import { WhatsAppIcon } from './WhatsAppIcon';

export async function WhatsAppFloat() {
  const t = await getTranslations('common');
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      title={t('whatsapp')}
      className="silver-ring fixed bottom-5 end-5 z-40 grid size-14 place-items-center rounded-full text-white shadow-lg shadow-navy/30 transition-transform duration-300 [--ring-fill:#141641] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:transition-none dark:shadow-black/40"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
