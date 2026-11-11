import { useEffect, useRef, useState } from 'react';

function Aparecer({ children, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    const observer = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (elemento) {
      observer.observe(elemento);
    }

    return () => observer.disconnect();
  }, []);

  let clases = 'aparecer';
  if (visible) {
    clases = clases + ' visible';
  }
  if (className) {
    clases = clases + ' ' + className;
  }

  return (
    <div ref={ref} className={clases}>
      {children}
    </div>
  );
}

export default Aparecer;
