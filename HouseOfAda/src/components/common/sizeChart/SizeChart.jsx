import React from "react";

const SizeGuide = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-6 py-10 text-center">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-wide mb-6">
        Size Guidance
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Use our UK size guide to find your perfect fit.  
        Each garment from <span className="font-semibold text-black">House of Ada</span>  
        is tailored for comfort, elegance, and confidence.  
        Match your measurements with the chart below.
      </p>

      {/* Size Table */}
      <div className="overflow-x-auto w-full max-w-3xl border border-black/10 rounded-xl shadow-sm">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-black text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="py-3 px-4 text-center">UK Size</th>
              <th className="py-3 px-4 text-center">Bust (in)</th>
              <th className="py-3 px-4 text-center">Waist (in)</th>
              <th className="py-3 px-4 text-center">Hip (in)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-black/10">
            <tr>
              <td className="py-3 px-4 font-medium">UK 6 (XS)</td>
              <td className="py-3 px-4">31–32</td>
              <td className="py-3 px-4">24–25</td>
              <td className="py-3 px-4">33–34</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">UK 8 (S)</td>
              <td className="py-3 px-4">33–34</td>
              <td className="py-3 px-4">26–27</td>
              <td className="py-3 px-4">35–36</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">UK 10 (M)</td>
              <td className="py-3 px-4">35–36</td>
              <td className="py-3 px-4">28–29</td>
              <td className="py-3 px-4">37–38</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">UK 12 (L)</td>
              <td className="py-3 px-4">37–38</td>
              <td className="py-3 px-4">30–31</td>
              <td className="py-3 px-4">39–40</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">UK 14 (XL)</td>
              <td className="py-3 px-4">39–40</td>
              <td className="py-3 px-4">32–33</td>
              <td className="py-3 px-4">41–42</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">UK 16 (XXL)</td>
              <td className="py-3 px-4">41–42</td>
              <td className="py-3 px-4">34–35</td>
              <td className="py-3 px-4">43–44</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="text-gray-500 text-sm mt-8 max-w-lg">
        🖤 Sizes are based on UK measurements.  
        For the best fit, measure your body and compare with our chart.  
        If you’re between two sizes, we recommend selecting the larger one.
      </p>
    </div>
  );
};

export default SizeGuide;
