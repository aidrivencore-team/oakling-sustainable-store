import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Award } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Organic Materials',
    description: 'All fabrics are GOTS certified organic, grown without harmful pesticides.',
  },
  {
    icon: Recycle,
    title: 'Zero Waste',
    description: 'Our packaging is 100% recyclable and we offset all carbon emissions.',
  },
  {
    icon: Heart,
    title: 'Ethically Made',
    description: 'Fair wages and safe conditions for every person in our supply chain.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Built to last through countless adventures and be passed down with love.',
  },
];

export function SustainabilitySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-sm font-medium text-primary uppercase tracking-wider">
            Our Promise
          </span>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Gentle on Earth, Made with Love
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We believe that what touches your child's skin should be as pure as their spirit.
            That's why sustainability isn't just a feature—it's our foundation.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-medium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Decorative gradient */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 transition-colors duration-300 group-hover:bg-forest/20">
                  <value.icon className="h-7 w-7 text-forest" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-secondary p-8 md:grid-cols-4 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: '100%', label: 'Organic Cotton' },
            { value: '0', label: 'Plastic Packaging' },
            { value: '50K+', label: 'Happy Families' },
            { value: '12', label: 'Countries Shipped' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="text-3xl font-semibold text-forest md:text-4xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
