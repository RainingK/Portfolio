import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { client, urlFor } from '../../client';
import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import './Testimonial.scss';

interface ITestimonial {
	name: string;
	company: string;
	imgurl: string;
	feedback: string;
}

interface IBrands {
	_id: string;
	name: string;
	imgUrl: string;
}

const Testimonial = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [testimonials, setTestimonials] = useState([] as ITestimonial[]);
	const [brands, setBrands] = useState([] as IBrands[]);

	const handleClick = (index: any) => {
		setCurrentIndex(index);
	};

	useEffect(() => {
		const query = '*[_type == "testimonials"]';
		const brandsQuery = '*[_type == "brands"]';

		client.fetch(query).then((data) => {
			setTestimonials(data);
		});

		client.fetch(brandsQuery).then((data) => {
			setBrands(data);
		});
	}, []);

	return (
		<>
			{testimonials.length && (
				<>
					<div className="app__testimonial-item app__flex">
						<img src={urlFor(testimonials[currentIndex]?.imgurl)?.url()} alt={testimonials[currentIndex].name} />
						<img src={''} alt={testimonials[currentIndex].name} />
						<div className="app__testimonial-content">
							<p className="p-text">{testimonials[currentIndex].feedback}</p>
							<div>
								<h4 className="bold-text">{testimonials[currentIndex].name}</h4>
								<h5 className="p-text">{testimonials[currentIndex].company}</h5>
							</div>
						</div>
					</div>

					<div className="app__testimonial-btns app__flex">
						<div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
							<HiChevronLeft />
						</div>

						<div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
							<HiChevronRight />
						</div>
					</div>
				</>
			)}

			<div className="app__testimonial-brands app__flex">
				{brands.map((brand) => (
					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, type: 'tween' }}
						key={brand._id}
					>
						<img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
					</motion.div>
				))}
			</div>
		</>
	);
};

export default AppWrap(
	MotionWrap(Testimonial, 'app__testimonial'),
	'testimonial',
	'app__primarybg',
);
