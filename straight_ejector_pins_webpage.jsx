import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Ruler, Package } from "lucide-react";

const diagramSrc = "data:image/png;base64,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a0fPnyNmzY0IYNG7rgggv67LPPmj59eoMHD+7dd9+tZ8+e7t+/v5UrV/bVV1/17rvvdtNNN3XgwIH+9Kc/9be//a1PP/20N954Y8uXL+/vf/97jzzySB06dKhHjx7tqaeeauPGjb355pslJSX17rvv9vDDD/fkk0/2xRdf1G233bbk5OTcddddfemll7r11lt79NFH27BhQ3fffXd79uzpk08+qVOnTnXq1KmGDBnSggUL2rNnT0uXLu3NN9/szTff7JprrmnNmjXV1dVt27atDz/8sM2bN7d69eqmT5/e5s2bu/POO9u7d2/79u0bPHhwq1ev7v3332/kyJFt27atXbt2LV26tNtvv71Nmza1cOHCNm/e3LZt2/rggw+6/fbb27JlSwsXLmzXrl3deuutnT59umeffbbBgwf3+uuvt27dOq+++mo7d+7s5MmTnT17tqeffrqvvfaad999t4ULF7ZixYp2796tffv2Lly4sNWrV7d27dr69++/oUOH2rlzZ2fPnm3Tpk3dfffdnTx5snvvvbdXXnmlRYsWdfz48b7yyit17Nix8vLyfvjhh+3atavu3bs3f/78jhw50v79+6usrKxLly71wAMP1NLS0sGDB3vxxRfbv39/8+bNa+XKlRkzZuy3v/1tFRUVvfPOO83Nzd17770NHz68gQMHVldX98MPP9TQ0NDevXurqKhox44dTZgwocmTJ+vWrVtzcnJ6+OGH++CDD2rYsGFHjhzpk08+qXPnznXw4MGOHz9eZWVliYmJ7t69u8WLF/faa6/16quv9uCDD1ZZWdnJkyf79NNPt2fPnjZu3Nj8+fO7ePHiJk+e3Ntvv92OHTt67LHH2rp1a7NmzWr79u3t2LGjTz75pIULF7Z06dLq6upaunRpO3bs6JVXXmnr1q1Nnjy5b775pm3btrV69eqWLVvWe++917vvvtvixYubNm1aI0eO7M033+ztt99u9OjRjRs3rtWrV3fvvfdWVVX1xBNPdO2113bXXXfV0NBQQ0PDPffccz322GNdffXVzZ8/v4YNG7r77rvbvHlzK1eu7MqVK6urq8vMzOzll1/u119/7W9/+1v9+/dv8+bNnT59unXr1rVv375s2rSp0tLSVq5c2Q033NC+ffv69NNP27VrV127dm3ixIn16tWr5s2bV11dXXfccUctW7asFStW9Kc//amvvfZaAwYMaPfu3XX06NEmT55c3759Kysr67bbbmvZsmXddddd/fDDD+vMmTOdP39+27dv39y5c9u1a1cPP/xwq1at6rbbbuv48eMdOHBgubm5TZ8+vUWLFvX22293+PDh7ty5s6qqqpYtW9bWrVtbv359Tz31VFdXV7v44ot77LHHqri4uF27drVnz55WrFjRzp07O3z48FJTUyspKfHkk0/24osv9v7777dly5aWLFnSjh07+m//9m+uuuqq5s+f34QJE1q8eHF79+7t22+/beLEiY0cObLx48f39NNP9+abb3b8+PG2bNnS9OnT27RpU1u2bOn111/v4MGD/f73v9+IESPq27dvjz76aDU1Ne3du7fbb7+9RYsW9eGHH3bkyJHmzp3b6tWrW7lyZVVVVf3yl79s0aJFXbp0qT59+tzgwYNdtGhRL7/8cps3b+7AgQNdvXq1zZs3d/To0T755BNNmjSpS5cu7dtvv23VqlXdd999ZWVl9eSTT3b16tUef/zxKisr27FjRz/88EM7d+6svLy8bdu2tXTp0l5++eU2bdrUZ5991oULF7Zt27bWrVvX5s2be/zxx7v//vtbvXp1cXFx/fjHP+7VV19t8+bNnTlzpmuuuabXX389a9eu7dSpU3vppZf6wQ9+0Ndff12vXr36xz/+0ZIlS5o/f37vvvtu69evb9euXQ0fPrxdu3a1e/fuZs6c2ZQpU9q0aVPPPfecd955p0uXLlVdXd2qVav6/PPP++CDD3r22Wf7+9//3vLly7v22mt77LHH2rx5c4sXL+6jjz7qvffe68EHH9S9997bkiVL+uijj/r1r3+9ffv29fzzz3f69Onu3r27yspK3n333Xbt2tW2bdv6xz/+0T333NPXX3/d5s2bmzVrVv369Wv8+PGtWbOmK664otmzZ3fvvfc2adKkli5d2s6dO3v11Vf73//+V6dOnZo5c2YHDhzotdde69KlSx09erTnnnuuQYMGdd999zVjxowOHjzYhQsXWrRoUf3792/VqlX94Q9/6Msvv2zLli3NnDmzF198sdzc3A4ePNiff/65ZcuW9cILL/Tyyy+3fv36Fi5c2MGDB+vfv39t3bq1VatWddVVV3X33XdXU1NT9erV6+GHH27Tpk1de+21nTlzpkOHDvXvf/+7b775pscee6xz5851zz33tHnz5vr27dtll12W2bNnN2LEiL788st69dVXW7JkSZ9//nk//PBDx48fb8KECZ0+fbo5c+b0yiuvdPz48e7du7f8/PyaM2dODz74YIcPH+7JJ59s0aJFvfnmm12+fLkFCxY0f/78jh49ur1797Z8+fJmzJjRzJkzO3LkSPPmzav169f3zDPPdO7cuY0dO7Y5c+Z0++23d+bMmS5evNj+/fubNm1q06ZN7dy5s1mzZvXDDz/0kUce6fbbb+/QoUPt2rWr9evXt3r16nbu3Nn06dObN29eEydObN26dS1durRbb721uXPnNmrUqG666aYmT57cbbfd1uDBg9u4cWNvvvlmZ86c2S233NLu3bvbvHlzAwcObNWqVd13331t27at0aNHd/ny5d5///2GDBnS5MmTO3jwYNu3b+/AgQO1b9++I0eOtGzZsr7//vu2bNnS3LlzW7x4cVdffXVbt27tk08+adCgQZ09e7bdu3e3fPnyJk6c2JQpU3r00Ue7dOlSZ86c2dVXX11SUlL79u1r1KhR9e/fv5UrV9aMGTPq2LFjnT59utWrV3fHHXf04IMP1pYtW9qzZ0/9+vVr06ZNvfDCC02aNKn8/PweffTRxo0b17lz52r79u2tWLGiQYMG9fbbb7du3bpWrVrV3r17e+6557r99ttbsmRJn3/+eYcOHapnz56dPn26TZs2dfjw4aZNm9YjjzxSly5d6tixYw0aNKjbb7+9pUuXduLEiR555JHq6uqef/75Lly40AsvvNCPP/7Y8uXLW7duXU2YMKH58+c3ffr0nn322S5fvtywYcOaNWtW48ePt2zZshYsWNCPP/7Y9u3b27JlS40aNSorK+vdd9/txIkT+u///u86fPhwmzZt6vTp0z3zzDMtXry4rq6uXn311V566aXmzZtXvXr1SkhIaPfu3X311Ve7c+dOY8eObePGjZ08eXKPP/54+/fvr7S0tM2bN7d9+/YOHjzYxIkTW7RoUXPmzOnVV1/t8uXLbdu2rVWrVnXvvff2hS98oYkTJ7Zo0aL69+9f48aNq6urq+3bt7dmzZo2bdrUb37zmwoLC3vppZc6duzY+fPnGz58eMuXL2/06NF9/fXXVVdX9+abb9a+ffs6ePDgCgsLe+655zpy5EgffPBBK1asaN++fW3ZsqWNGzc2dOjQ9u3b18SJE+vVq1d79uzp9OnT3XnnnS1btqxly5Z18803d+bMmfr27VtNTU3vvvtuH330UVdddVWjR49uxYoV7d27t4kTJ3bq1KnatGlT586d65tvvtmYMWM6duzYfve73/XBBx80YcKEJk6c2K233trKlSv7+eefq6io6NSpU12+fLm5c+d2+vTpTpw40T333NPLL7/c5cuX27VrV0888USLFi1q+vTpnT59uhkzZjRu3LgkJSU1derU+vXr1zXXXFPt27f39ttvd8cdd1RZWdn27dt7+OGH27VrV+PHj++KK67o/Pnz/fSnP23+/PmNHz++yy+/vL59+zpy5EijR49u8+bNXbt2rT179jR27NiWLVvWqVOntm/f3sWLF/voo4+6/fbbmzhxYitWrGj16tW9//77vffee3Xw4MHatGnT8ePHmzhxYikpKXXr1q3rr7/e22+/3ahRo1q6dGl9+vSpVatW9eijjzZlypS6du1a/fr16+GHH27VqlV98sknnTx5sv379+v111/v008/7fTp0zV48OBmzJjRtm3bunPnTjfffHPr169v3bp1/fKXv+zAgQN99tlnPfvss61du7bCwsJ27NhR8+bNa9iwYd17772dP3++FStW9OGHH9aOHTu69957u3HjRjt27OjIkSNt2rSp+fPnd9NNN/Xoo4+2b98+Q4YMafLkyd14440lJSWdOHGi7t27t3fv3g4dOtS6det6++23u3DhQh9//HF33XVXV111Vb169erpp59u0aJFrV27tl69etWkSZPasmVLp06d6s9//nP9+vVraWlpFyxY0Pnz55s7d24LFizo8uXL/fvf/2716tUNHDiwcePGdeDAgWbOnNnKlSu76qqr6tatW0eOHGnjxo39+uuvHX/88Q0YMKB33323YcOG9eabb3bvvffW6dOn+/jjj7v//vs7d+7c4sWLW7VqVX379u3w4cN9+OGH3XDDDXXu3LkFCxY0Y8aM3n333aZNm9a1117b999/39ixY5s1a1Zr1qzps88+68CBA7vxxhu7c+fO7rzzzhYvXtz777/fuHHjSkpK6tKlSx0/fry1a9fWsmXLGjVq1LPPPtuJEyc6f/58U6dO7YknnqhDhw61detWLVy4sD/84Q/17du3Q4cO9corrzR69Ojeeuut0tLSGjNmTH379u3SpUt9/vnnTZ8+veHDh3f69OlmzpzZypUr27NnT3PmzKlNmzZVXFzc7NmzS0xMrH79+nX48OGefPLJ7rzzzj755JMtWbKkJ598slWrVjVx4sQOHTrU9u3bmzdvXtOmTevAgQO9/fbbHT9+vF69etWgQYOaMGFCV111VQsXLuz1119v7dq1NWXKlI4fP96f/vSnXn/99bZs2dKhQ4caO3Zsv/zySwsXLmzw4MFdffXVFRcX9+CDD3b58uUGDBjQqlWreuedd+rZs2fvvPNOTz75ZHfddVfPP/98zz77bNOnT6+qqqqRI0d21VVXVV1d3QMPPFBdXV179+7t1KlTdffdd/fss89WVFQ0ceLElixZ0oMPPtjBgwd75JFH2rp1a7t27Wrp0qV17ty5KVOmdN999zV48OD+/ve/99VXX/XCCy/0v//9r5kzZ7Zx48YWL17cvHnzO3bs2J07dzZv3rzWr1/fvffe2zPPPFPDhg2rqqpq5syZbdq0qf79+9ekSZN65JFHmjRpUs8991w1NTVNmjSpQYMG9eSTT3b8+PFmzJjR0qVL69evXwsXLmzEiBEdOnSot956q4ULF7Z58+bWrl3b3LlzGzNmTD/96U9bs2ZN+/bt6+233+7QoUOtX7++8vLydO/evZ555pnefffdGjVqVElJSR0+fLhTp061ZMmSTp48mT17dmvXrm3cuHFt27atWbNmddddd/XOO+/UtGnTvvjii2bOnNmpU6d6/vnnW7x4cY8//nj79u3rww8/7NVXX+3dd9/tyJEjHT16tAULFrRr164OHTrUww8/3EsvvdSxY8f6zW9+08KFC7v99tv7+uuvW7FiRdu2bWvSpEmtXbu2EydOdP78+VauXNmFCxe2fv36li1b1uTJk7vxxhubN2/eG2+80cCBA1u9enW7d+9u3bp1TZw4sVmzZjVu3LjWrl3b+fPnO3ToUNdcc03r1q3r4Ycf7plnnun48ePddNNNnT59ulmzZvX111/3yiuv9MILL7R79+4uXry4EydOtHnz5pYuXdq1117b4sWLGzZsWGfPnm3Lli2NHj26kSNHdvbs2f7xj39s4cKFjR8/vmPHjm3Xrl2NHTu29evXt2vXrp577rkeffTR5s2b1/Tp01u4cGH79u3rtttua+LEiS1durSlS5e2YcOGDh06VElJSc2YMaNvv/22V111Vb/97W87dOhQK1as6Lbbbqu+vr7PP/98ffv2bcaMGbVv376DBw+2cuXK3n333S5fvtzjjz/eG2+8UVlZWWfOnNmiRYs6dOhQy5cvb8yYMT311FPdfffdtWjRopaWlnr55Zd77LHHWrVqVStXruyyyy7r3Llz3XXXXa1evbrp06e3f//+evLJJ1u3bl1PP/10Z8+e7aGHHurZZ5+tQ4cO9eGHH7Z27drOnz/fwoULu3DhQm3atGns2LGdPn26V155pY8++qgOHTq0Y8eOdu/e3dKlS3v66ad7+OGHu3DhQitXruzzzz/vwIEDrVmzppkzZ3bzzTfXv39/3bt37+WXX+7ZZ59t1KhRrVq1qq+//rp77rkn69at6+eff+7w4cM9++yzVq9e3fXXX9+FF17YlClTOnXqVBMnjmzlSpUdPny4U6dOdcstt7Rq1apOnz7dsmXL+v3vf9+AAQOaNm1aJ0+e7P7776+3t7cHHnigL774oq5du9b48eO7dOlSK1as6M033+zBBx/0+uuv98EHH7R169YWLFiQlpbWihUrGj16dM8880x79uxp6dKlLVy4sISEhK5evdrzzz/f4MGDu3HjRikpKb3yyitNnjy5hIQEzZgxox49etSgQYMaMmRIFyxY0Pbt25s1a1a33357r732WocPHy4mJqYPP/ywFStW1Nzc3JIlS/rwww9bsWJFR48e7ciRIz399NN9+OGHHTp0qEGDBnXvvfd2++23d9lll7Vnz55+97vf1bRp03rwwQfNmDGDkydPduONN/biiy/2+eefN2LEiE6cONHs2bM7fPhwq1at6u233+7111/v559/rlGjRtW2bduOOOKI6urqGjhwoCuuuKLBgwfXoEGDWrRoUV988UUnT57s7Nmzbd68udmzZ3f48OG2bNnS5MmTu3XrVtOmTev5559v9erVx48f39atW5s5c2b79u2rVatWvf32261cuTL79u1r3LhxjR07tmXLlnX69Onu2LFjdXV1ffzxxz3//PM999xzTZ8+vSuuuKI333yzYcOG9e2337Zq1aq+9tprPffccz3wwAN17969q666qvr6+v7zn/90/PhxjRs3rj179nTixInWrVvX6dOnGz9+fM2bN6+mpqa6dOlS7733Xh999FH79u2rYcOG9cYbb9Q999zT7Nmz69GjR7t06dIWLlzYhQsXSkhIaMCAAa1fv77XX399kydP7q677urRRx/VvXv3Fi5c2Pjx4/v8888rLS3t8ccf77XXXmtWVlY5OTldd911DR8+vB07drRq1aq6devWyy+/3Pfff9/IkSNbvHhxy5Yt69atW505c6YvvPBCvXr16uLFi9u8eXMvvfRSzz77bM2aNevQoUPt27evxx57rPr6+vbu3dtVV13VfffdV7NmzRo/fnxz587t9ddf7+WXX+6oo47q5MmTDR06tHXr1nX79u0GDBjQzp07a9u2bV199dWtWrWq0aNH19jY2MMPP9zhw4f7zW9+02OPPdY999zT1KlTmzJlSjNnzuzpp59u9OjR7dy5s59//rllS5e2du3aduzY0ZAhQ1q6dGn33HNPt99+e62trXX77bfXqFGj2r59e8OHD6+kpKQmTJjQ4cOH+9e//tU111zTsGHD2rFjR8uXL+/gwYN17dq1Vq1a1dSpU7viiis6c+bMtm3b1gMPPNClS5d6//33mzt3bqNHj27GjBmdOHGiX//611q+fHmLFy9u4cKFjRs3rjfffLPPPfecDz74oP/4j/9o27ZtXXDBBZ0+fboXX3yx5s6d2wsvvNDQoUO7ePFiS5cubdKkSXXo0KG1a9d26NChHn744Q4cONDJkye7//77u3TpUjt27Oj1119v9erVHT9+vK+//rrRo0d3xx139MILL/T88883ceLEFi1a1Pbt2/v888/7wQcf7O67727btm3NnDmz0aNHt2/fvsaOHdtzzz3X/Pnz++ijj9q0aVOrVq3qp59+6rHHHuu1115r6NChXXzxxf3000/9/e9/78orr2zlypX179+/K6+8shUrVnTFFVf01FNP9dRTT7V8+fJuvfXW4uLiOnDgQO+8804vv/xyN998c9OnT+/QoUM9+OCDde7cuVavXt0tt9zS008/3Y033tjs2bP79ttv69SpU7366qutXbu2kSNH1q9fP8uXL+/vv/9u8uTJvfrqq+3du7eXX365P/3pT3XlypUGDRrU8OHDO3HiRO+8807Lly9v6dKl/fWvf+2NN95o8uTJPfTQQ/3rX//qiiuu6Jtvvqm0tLSjR48WExPTu+++2+rVq5s3b15NmjSp5557rnr16nX//ff3hz/8oVWrVvXII4/0xBNP9Nprr9WlS5e67bbbmjJlSg0dOrT9+/d3xx13NGTIkD766KMaNGhQeXl5HThwoJUrV5aWltbKlSu7/vrrW7duXadPn27UqFEtWLAgLy+vG2+80f79+1u7dm2zZs3qxIkTPffccy1durTbbrutRYsW9fTTT3f8+PGeeeaZDh48WB07dmz06NENHz68zz77rPPnz/e73/2uH3/8sb59+1qxYkUvvPBCffv2bd68eZ09e7aHHnqoX/3qV7Vt27bp06d39uzZnn766e7evbvZs2f36aefduDAgV588cW6detWQ0NDn3zySdOmTevVV19t/vz5vfXWW/Xq1avq6uqefPLJZs+e3dtvv91TTz3Vgw8+2J49e1q4cGEjRoyorq6uEydOtHjx4h588MEOHz7cqlWr+uabb/r888/7/PPP69ixY5s4cWKzZs3qt99+67bbbmvz5s1NnTq1YcOG1bVr15YvX95zzz3Xq6++2vPPP19ZWVnPPPNM3bt3b9GiRT3++ON99913TZo0qW7dutW6dev6+OOPW7ZsWaNGjaply5a1cOHCFixY0M6dO7v++uvr2LFjdXV1Pf300y1atKgnn3yy2traev3111u1alW7du3quuuu69KlS1u0aFG7du1q1KhR9ejRo3vssce65557Wr58eU2dOrWSkpIaOHBg06dP78UXX2zlypVNTU1t27atZs2a1f79+3v88ce7fPlyCxcubP78+S1btqyGDRvWpUuXevXq1T333NPLL7/c+vXrW7x4caNHj+7FF19s8+bNvfnmm6WlpfXoo4+2ePHiJk+e3OTJk9u3b19Hjx7t6NGjbdu2rQ8++KCNHTu2YcOG9fjjj3f27NluuOGGtm7d2qFDh9qzZ09dunSpuLi4xo4d2x133NGePXu6cOFCf/7zn1u1alVNmTKlGTNm1LBhQy1evLi77767kydP1q5du55++ul+/PHH6urqeuqpp7r33nv17Nmz7du3t2XLlu64447efffd3nrrrRkzZuzBBx9s5MiRffDBB7322mtNmDBhTz/9dObMmVP9+/c3Y8aMRowY0aJFi9q1a1dvvfVWV111VbNnz+7BBx/0hz/8oZ07d3bPPfdUWFjYV1991eHDh3vrrbeqra1t0KBBTZs2rWXLlrVly5ZWrlzZmjVrGjVqVJ999lnLly9v4MCB3X333e3fv79ly5Z11VVXtWHDhg4dOtTzzz/fmTNnVlZW9v7779e1a9fq2rVrxcXF3XjjjS1btqzHH3+8J598sjNnzuymm27qzjvvrF27drVgwYJGjhzZxx9/3LBhw9q4cWN33313mzdv7scff2zJkiW9++67vfjii3X58uVef/31xowZ0+zZs2vKlCndf//93X777b311luNHDmyN998s6effrqlS5f2wQcf1BdffNFtt93WgAED2r59e/369Wvv3r0NGDCgEydObOvWrXXv3r3mzJmTlpbW0qVLmzBhQjNmzOijjz7q+uuv79ChQz3yyCN9+OGH3XjjjTU1Ne3evbtly5a1cOHCtm7d2sKFC3v11Vf7yCOP1KFDh7rgggu69957O3z4cP369ZsxY0b9+/f3u9/9rtWrV1dVVT3wwAP16NGjKVOmdP/99/f66683d+7cjhw50oMPPthdd93V9u3b+9vf/tajjz7aunXrSktL6+233+7AgQMdPny4uXPn9v7773f77bf3xBNP9PDDD3fPPfe0Z8+e7rjjjnr16lVfX9/x48e7fPlyGzdu7L777uutt97qgQceqLCwsK5du9bcuXObPn16jz/+eLNmzWrx4sXdeuutnT9/vsWLF3f77bf36quvduDAgZo5c2b79u0rLi7u0Ucf7b333uv7779v+/btffXVV8XFxX3++ed17ty5Hn/88T799NONGjWqCRMmdPTo0T766KMaNGhQGzZs6N57723VqlVNmjSpQYMG9eijj3bPPfd0+PDhVqxY0Q033NCWLVu6/fbb+/bbb7vhhhu6ePFiZ86c6aWXXuqxxx7rww8/7K677uqf//ynBg0a1N69e/vzn//cO++8U1tb2+7du7vjjjv6y1/+0rx58+rUqVNdXV1vvfVW06ZNa+PGjX311VdNmDChe++9t7q6uh5//PGmTp3aHXfc0dtvv93QoUN77LHHWrduXWfPnu3WW2/tmWee6b333uvJJ59s6tSpTZ8+vWOPPdbWrVvbunVrTz31VL/61a+6cOFCZ86caeXKld1www1dfPHF3X333S1fvrzS0tKuueaa5s2b15o1a2rMmDF9+OGHHThwoNWrV7d27drq1q1bLVu2rOuuu67f/e53vfrqq/31r3/txIkTW7RoUQ0dOrQ///nPvfTSSz399NO9+OKLTZ48uYULF7Zx48bWrVvX66+/3nvvvddf//rXli9f3uLFi3v11Ve7du1a69at69KlS9u5c2dTp07t9OnT3X333Y0fP77ExMSeeuqpbr311qZMmdK2bdvaunVr06dPb8qUKY0ePbo33nhjTz31VNmzZ3f48OGOOeaYNm3a1IEDB9q5c2fXX399gwYNaunSpX3wwQctXry4Q4cOdd1113X11Vf3yy+/9OWXXzZs2LCmT59eW7du7fHHH29xcXEvv/xyb7/9dubMmZs0aVKjRo3q6aef7s0332zVqlXt27evp59+uv/617+6/fbb69q1a5MnT+7AgQM9/fTT3XvvvV188cVdfPHF7d69u0mTJnXppZd2zz33dN9993XlypXeeeedzZs3r0uXLrVt27bq6uqefPLJ7r777j7++OMmTJjQ8ePHW7VqVX369GnKlCk1b968nj17trVr1/bggw+2YcOGli5d2vr16zvzzDN17dq1Hn/88TZu3NjLL7/c0aNHGzZsWJ07d66qqqoNGzY0Z84cLr/88v7yl7909913V15e3uHDh3vjjTfau3dvS5YsaezYsbV27dpGjhzZ2rVrW7hwYQ8++GC5ubk98sgjDR06tK5du9ZLL73U4sWLmzp1ah988EGdOnWq7du3d+7cuY0dO7Yvv/yy9u3b16pVq1q7dm2zZs1q48aNDR48uLvvvrsLL7yw3//+9z3++ON9++23bd68uYULFzZ48ODmzp3b7NmzGz9+fJcuXWrixIk9+uijvfbaa23fvr2HHnqoc+fOtW/fvubOnduyZcv67LPPunDhQm+//XZ79+7tlltu6fjx43Xs2LHeeuutvvjii5o2bVqtW7euP/zhD7Vq1aprr722pKSkzJ49uylTprR58+Y+//zzZs6c2ZtvvtmYMWNaunRp06dPb/369e3du7du3bp1w4YNmzdvXnPmzOnOO+9s4MCBXbt2rSlTpnT58uWmT5/e4MGDmzRpUoMHD+7mm29u0KBBXbp0qbVr17Zo0aIeeOCBdu3a1Q8//NCmTZu65557evjhhxswYECrVq1q5MiRzZ8/vyuuuKLz58+vX79+Pfjgg7rmmmu6/fbbmzp1apMnT26PHj06evToJk6c2IEDB1q9enXTp09v1KhRXbp0qVdeeWWHDx/ul7/8ZV9//XWZmZnNnDmzVq1a1YABAzp48GCvvfZa77//fv3792/jxo2tXr26QYMGdenSpT7++OOaMGFCY8eOreLi4pYuXdrkyZM7evRo48eP79NPP+2TTz7pnXfe6YMPPujAgQM9+eSTffjhh83Pz2/x4sW9//77TZ48uY0bN7Zu3bqWLFnS3LlzS0pKau7cuS1durRp06Z17Nixli5d2hNPPNF9993XnDlzGjJkSEuWLOm1117r7NmzW7VqVd26dWv69Ol17ty5Hn300f7yl7/0+OOP9+WXX3bixImWL1/e5MmTGzduXPPnz69ly5Yee+yxVqxY0Wuvvdb+/fubPn16U6ZM6Yc//GGffvppq1at6uuvv27UqFE1btw4Tz75ZD/88ENvv/12Z86c6Y477ujhhx/W7NmzW7t2bWfOnNnKlSu7dOlS4eHh7t69u2XLltWjR4/67LPPGjx4cNOnT++OO+7o9OnTzZw5s8cff7zNmze3devWli1b1urVq5s/f36nTp3q2Wef7YILLqi0tLTmzZtX69ata9OmTQ0aNKjXXnutp59+umeeeabRo0d3+vTpnn766bp27drQoUPbs2dP8+bNa9CgQXXr1q2FCxf25ptvduDAgfr06VNTU1PTpk3r8uXLjRs3rn79+nXixIldd911ffTRR/Xq1av333+/6dOnd+TIkX744Yd69OjRyy+/3K5du6qoqKhdu3Z14MCBnnnmmRYsWNCAgAC9evVq8+bNnTlzpoEDB3bzzTffY4891pkzZ7rttttav359n3zyScOGDWvKlCm9+OKLffvttzVr1qzOnTtXWFjYt99+u1q1am3fvr0XXnihgoKC9u7dW3V1dS+88EJ79+5t8+bN3XDDDXXq1KkzzzyTlpbW0KFDmzt3bubOnduFCxf2hz/8oYULF3bzzTe3efPmbrjhhu66664WL17c+vXrmzJlSl9//XWzZs2qQ4cOffTRR+3YsaMvvPBCgwcP7s4779TQoUM9//zzXbt2rS+++KJ58+b1+uuv98YbbzR79uz69OlT4eHhTZs2rTfffLNVq1a1YcOG1q1b19y5czt9+nSrV69uxYoVLVmypN69e3fkyJE98sgj7d27t7///e+9/PLL3XnnnY0ZM6aVK1e2e/fu9u7dW0lJSVdeeWWHDx/uH//4R9u2bWvcuHG99tprnTx5sk8++aSVK1f2r3/9q48//rjp06f38ssv19TU1AcffNCnn36q9evXt2bNmoYMGdLll1/eXXfd1WOPPdYLL7zQ1KlT+9nPftb+/fu7//77mzt3bo8++qgLFy60fPnyJk6c2Pr16+vSpUudP3++1157rY0bN7Z27dpGjhzZ8uXLW7FiRc8991wTJ06sUaNGdeDAgYYMGdK0adPaunVrTz/9dM8//3wLFiwoNTW1L774ol27drV48eKefvppS5Ys6a233mr69On95Cc/6eabb+7uu+/u7NmzffPNN3XixIldccUVvfzyy1q+fHnPPPOMli1b1pw5c7r99tu7/vrrO3ToUMuXL+/VV1/t+eef79SpU9u4cWNffPFFN954Yx06dKhdu3Y1c+bMbrjhhi5evLjNmzc3ZcqU9uzZ0/Tp09u2bVubNm3q1KlT9evXr/fff7/lS5f2v//9r7feequ2bdvWqFGjGjVqVOPGjWvKlCnNnz+/rVu39sEHH3T69OmGDBnS66+/3vfff99HH32UlpbW5cuXmzdvXm+99VbPP/98Tz31VGfOnGlWVlY1atSoBx98sMWLF7d69eouX77c999/37Jly7r55ptbv359gwcP7sUXX2zIkCFdv369jh8/3mOPPdbVV1/ttdde68MPP2zGjBlddNFFTZs2rYULFzZs2LC2bNnS4MGD9e7du2effbZ58+Y1ePDgxo0b17x583rxxRfr3bt3L7/8ciNGjGjSpEmdPn26yZMnd9ddd3X48OEmT57csmXL+vjjj5syZUpvvfVWd999d5s3b27VqlW1aNGizp07V3V1dc2cObNNmzY1fPjw3nzzzbp27drGjBnT+PHjmzp1avXr1+vSpUtNmzYtPj6+tWvXtnnz5po0aVJNTU2PPvpozz//fPn5+V199dV16NChxo0b1+LFi2vSpEm9/vrr7dixozfeeKNZs2Z18cUXN2rUqKZMmdK9997b6NGjW7NmTc8880zZs2d3wQUX9Pzzz3fvvfdWVFQ0a9asli5d2siRIx0/fryRI0f2yiuvNHv27Nq3b19JSUnNmjWrevXqPfbYY9WuXbsmT57ctGnTWrJkSRs3bmxVVVXjx49v2rRpZWVlZ86c2e7du9u5c2ezZ89u0aJF3XLLLQ0fPrzNmzfX9OnT69y5c61evbrnn3++r7/+umPHjm3btm3deuutvfXWW23cuLFmzZqVlpbWsmXLmj59esOGDWNkZKSFCxc2aNAgQ4cObe3atb300kvNnDmz3//+9/r06VOvvvpqzz33XAcOHKisrKzFixf38MMP9+yzz1q8eHFz586tQ4cOddJJJ3Xq1KkOHTrUAw88UL9+/frQQw81b968nn322e66666aM2dON998c2fOnOmRRx7p9OnTTZw4sSFDhjRq1Khmz57dli1b2r17d3369KmEhISmT5/eJ5980qFDh7rpppt6/fXXu2jRoo4ePdrGjRtr0qRJBw8e7I477mjKlCnNnTu3O++8s6lTp7Z79+6+/PLLNm7c2KBBg7r99tt79NFHmzp1aocOHarHHnusyZMnN2HChIYMGdLjjz/e/v37u3DhQvXr1+vbb7/twIEDTZs2rQMHDnTixImOHz/eTZs29fjjjzdo0KBmzZrVvXv3WrlyZWeffbbNmzcvIyOj7t27d9lll/X111+3YsWKRowY0f79+5s4cWK7du3q5Zdf7sUXX2zUqFE999xzbd68uW+++aZ27drVtm3beuKJJ7rzzjv17Nmzli9f3rVr17rjjjtq0qRJnT59uvfff79Nmza1a9euOnLkSNu2bWvixIk99NBDbdu2rUOHDjV8+PD279/f66+/3syZM9u/f3/Lly/v3Xff7aWXXurw4cO9/vrrZs+e3fDhw9u2bVvbtm0rIyOjdu3a1VtvvVVzc3OVlZUdOHBgR44c6dlnn21oaGgLFy7s2rVrTZo0qbVr19a2bdtaunRpv/71r9u1a1f79u1r8ODBjR8/vi1btvTyyy93+PDhNmzY0AcffNC2bdv67rvv2r17d3Xr1q1nnnmmGTNmtG/fvl5++eX69u1b48aN6+DBg7VkyZJmz57d8uXLdffdd3fPPfd0xx13NGTIkE6dOtW5c+e2Z8+eJk2a1LFjx7r22mt77bXX2rhxY5MnT27GjBmdPHmytWvX9sknn2zdunXt2rWr4cOHt2fPnnr16lVbt26tHj16dM4557Ro0aJOnDixN998s7Vr17Zw4cKef/75Zs+e3bJlyxozZkwTJkxo8+bNnT9/vgEDBnTttdd2+vTppk2b1oEDB+rdu3e7du2qVatW9fzzz3fbbbc1a9asli5d2sGDB/vaa6+1cuXK3nrrrWbMmNH8+fO7//77GzlyZOnTp7d48eI2bty4wYMHd+LEiXr37t2FCxc2atSoFixY0PTp0zv33HN17Nix1q1b18KFCzvttNOaP39+TZ48uWXLltWjR4/67LPP6tatW507d24TJ06sV69eTZs2rYEDB3bkyJEmT57cbbfd1uHDh1u3bl3NmDEjAwcO7LPPPtPcuXN77LHHuummmzp37lyLFy/uwoUL69ChQ/3www9VXV3dSy+9VNu2bS1fvrxf/vKXvfzyyz311FN17dq1du3a1Z49e7rjjjvq3LlzTZ06tbFjx7Zw4cJefPHFpk2b1jXXXNP111/f0KFDW7BgQfPmzWv16tU9++yz9evXr1u3bl1PP/10zzzzTDfffHNvvvlm3bt3r4kTJxYWFjZs2LCOHz/eX//61z3++ONt2bKlHn/88R577LHmzp3bggUL2rJlS0OHDu35559v6dKlbfv27f3pT39q2bJlbd26tVmzZjV16tQee+yxJk2a1OHDh9u1a1dz586tUaNGdffdd3f69OmOHj3a5s2bO3fuXOfPn9+BAwdas2ZN27Zta/LkyX3zzTc1ceLEPvvss9q5c2cTJkxo+PDhHTlypHnz5jV16tQWLFjQ0qVLmzlzZuPGjWvv3r3NnDmzhQsXdu3atS1evLiRI0e2Y8eONm7c2JEjR5o3b14TJkxoy5YtTZs2rQEDBnTixInOnDnTihUr+uKLL9q9e3fbtm3r9ttv7+TJk82ePbvPP/98s2fP7uuvv24PP/xwzz//fG+99VbXXXddDz/8cB9//HHz5s3r4YcfbsqUKf3rX/9q9+7dbd26tVlZWY0cObL27dvXkiVL2rFjR6NHj27u3LlduHChTZs2deTIkS1fvry6urr++c9/9vzzz6+ioiLNmjWrq6urbr/99k6dOtWIESPaunVrf//73zV69Og2bNiwzZs3N3To0A4dOtSJEyeqra3t1Vdf7cEHH+zvf/97f/zjH7V58+b27dvX/PnzO3Xq1H7xi19s0qRJHT9+vJUrV9a3337b4sWL+/zzz5s5c2aLFy/u5MmTeuqpp2rTpk2tX7++559/vrNnz9ahQ4d69NFHu/vuu/vyyy9btGhRffv2rbi4uCZNmtQVV1zR5MmT69OnT8uWLWvOnDm9//77nTlzpmPHjtW4ceN66aWXOnDgQJs2bWpWVlZTp04tIyOjN954o86dO1dTU9Orr76qZcuW9ec//7mZM2e2Zs2aevLJJ3vsscdq0aJF/fGPf9SpU6emT59e586d7dixozNnzuzy5ct7//33Gzx4cMOGDWv69OkOHjzYzz//3MyZM9u8eXMHDhwoNTW1gQMHdvLkyY4ePdqYMWM6fPhwW7ZsaevWrbVq1aq2bNmSnp7eihUr2r59e8uXL2/NmjVNTU1t3LixHn744dauXdumTZt68skn+/zzz3vqqadaunRpGzdu7Ny5c4MGDWrevHn9/e9/r7i4uB07dpSTk1N79+6tvLzcvHnzmjJlSmPHjm3Pnj0tWbKkPn36NGjQoHbu3Nn69evr2LFjXbp0qRMnTuz9999v06ZNHT16tK1bt7Zu3br69OlTy5Yt68QTT9S+fftKSkrq448/bvPmzT399NMtXbq0GTNmdMstt7R9+/YePHiwefPm9u/f39y5c1uxYkX79u3r+eef7+DBg82ZM6dZs2Y1YcKEVq1a1SOPPNKiRYs6fPjwvvjiizZu3Nj8+fP75JNPuuGGGxo+fHjLly8vKSnprrvu6oUXXuiZZ57p3Llzvfzyy23evLn333+/X//615o/f36tW7euV155pSuuuKJjx46VlJTUunXrGj58eA8//HCjRo3q6NGjLVmypN69e9u3b1+zZs1q0aJFLV26tMcee6xnn322L774omuuvba77rqr0aNHN3Xq1J5++unWrl3bhQsX9uijj1q+fHkTJkxoypQpde7cuQYNGtSxY8e67777Wrt2bZ07d66BAwe2cePG3nvvvR588MEaMmRInTp1qr6+vmeffbYNGzY0aNCgXn/99Q4ePNjQoUPduXNn//SnP7V06dI2bdrUkiVLWrx4cW3atKkXXnihP/7xj1qwYEEzZ86spKSkHnrooaZPn969995bV199dYMGDerRRx/tzJkzLViwoH379rVq1aqefPLJHnnkkfbs2VNOTk7r1q1r0KBB9evXr9dff70vvvhC27Zta8OGDT377LO9+uqr3X777Q0YMKC9e/du7dq1PfbYY7300ks99NBDnT59uq5du5aWltbs2bPbvHlzy5cv79tvv23YsGH98Y9/7J133mnUqFG1a9eu5s6dW7NmzSpfvrx33nmn1q5d29GjR9u6dWt33nlnd999d3PmzClt27Y1ffr0Nm7c2Pvvv98LL7zQjBkzWrNmTQ8//HDLly9v+PDhLV++vJ49e9q0aVPHjx/v0Ucf1bNnz9q0aVNjx45t8+bNDh48uEmTJjV58uQaPnx4s2fP7oYbbuj06dN58cUXGz16dD179qz58+e3devWfv31V7t27WrEiBG9+OKL33nnnZ0/f77HH3+8NWvWtGjRoqqqqrr99tt7+eWXW7x4cQ8//HADBgzo6aef7rHHHqvVq1d3+PBhTZo0qb6+vrfffnt79+7t8uXLvfjii5o1a1bTpk1r1KhRzZo1q+7du6usrOx3v/tdo0aN6vHHH+/zzz+vW7duLVmypA8//LB169bVv39/06ZN6/Tp08uWLeuTTz5p5MiR3XzzzV199dXdeuutjRs3rtGjR3fvvfc2Y8aM9u7dW7du3fryyy/79ttvN3ny5Dp37tyGDRv2P/HqAQAAAAAgT+RcAABAAAAAPgEBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAICnEQAAAAAAeBoBAAAAAIDn/wNqbi1JvJ7h7AAAAABJRU5ErkJggg==";

const rows = [
  ...[1.0,1.1,1.2,1.3,1.4].flatMap(p => [100,150].map(l => ({ type: "EPN", p, l }))),
  ...[1.5].flatMap(p => [100,150,200].map(l => ({ type: "EPN", p, l }))),
  ...[1.6,1.7,1.8,1.9].flatMap(p => [100,150,200].map(l => ({ type: "EPN", p, l }))),
  ...[2.0].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[2.1,2.2,2.3,2.4].flatMap(p => [100,150,200,250,300].map(l => ({ type: "EPN", p, l }))),
  ...[2.5].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[2.6,2.7,2.8,2.9].flatMap(p => [100,150,200,250,300].map(l => ({ type: "EPN", p, l }))),
  ...[3.0].flatMap(p => [100,150,200,250,300,350,400,450,500].map(l => ({ type: "EPN", p, l }))),
  ...[3.1,3.2,3.3,3.4].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[3.5].flatMap(p => [100,150,200,250,300,350,400,450,500].map(l => ({ type: "EPN", p, l }))),
  ...[3.6,3.7,3.8,3.9].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[4.0].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[4.1,4.2,4.3,4.4].flatMap(p => [200,300,400].map(l => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[4.5].flatMap(p => [100,150,200,250,300,350,400].map(l => ({ type: "EPN", p, l }))),
  ...[4.6,4.7,4.8,4.9].flatMap(p => [200,300,400].map(l => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[5.0].flatMap(p => [100,150,200,250,300,350,400,500].map(l => ({ type: "EPN", p, l }))),
  ...[5.1,5.2,5.3,5.4].flatMap(p => [200,300,400].map(l => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[5.5].flatMap(p => [100,150,200,250,300,350,400,500].map(l => ({ type: "EPN", p, l }))),
  ...[5.6,5.7,5.8,5.9].flatMap(p => [200,300,400].map(l => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[6.0].flatMap(p => [100,150,200,250,300,350,400,500,600,700,800].map(l => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[6.1,6.2,6.3,6.4].flatMap(p => [200,300,400].map(l => ({ type: "EPJ", p, l, pBracketed: true }))),
  ...[6.5].flatMap(p => [100,150,200,250,300,350,400,500,600,700].map(l => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[7.0].flatMap(p => [100,150,200,250,300,350,400,500,600,700,800,900,1000].map(l => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[8.0,10.0,12.0,15.0].flatMap(p => [100,150,200,250,300,350,400,450,500,600,700,800,900,1000].map(l => ({ type: "EPJ", p, l, lBracketed: [450,600,700,800,900,1000].includes(l) }))),
  ...[13.0].flatMap(p => [100,150,200,250,300,350,400,500].map(l => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[16.0].flatMap(p => [100,150,200,250,300,350,400,500,600,700,800,900,1000].map(l => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[20.0].flatMap(p => [150,200,250,300,400,500,600,700,800,900,1000].map(l => ({ type: "EPJ", p, l }))),
  ...[25.0].flatMap(p => [200,300,400,500,600,700,800,900,1000].map(l => ({ type: "EPJ", p, l }))),
];

const grouped = Object.values(
  rows.reduce((acc, row) => {
    const key = `${row.type}-${row.p}`;
    if (!acc[key]) {
      acc[key] = {
        type: row.type,
        p: row.p,
        pBracketed: !!row.pBracketed,
        lengths: [],
      };
    }
    acc[key].lengths.push({ l: row.l, lBracketed: !!row.lBracketed });
    return acc;
  }, {})
).sort((a, b) => a.type.localeCompare(b.type) || a.p - b.p);

export default function StraightEjectorPinsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [pFilter, setPFilter] = useState("all");
  const [lengthFilter, setLengthFilter] = useState("");
  const [search, setSearch] = useState("");

  const pOptions = useMemo(() => {
    const base = typeFilter === "all" ? grouped : grouped.filter(item => item.type === typeFilter);
    return [...new Set(base.map(item => item.p))].sort((a, b) => a - b);
  }, [typeFilter]);

  const filtered = useMemo(() => {
    return grouped.filter(item => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesP = pFilter === "all" || String(item.p) === pFilter;
      const matchesLength = !lengthFilter || item.lengths.some(x => String(x.l).includes(lengthFilter));
      const text = `${item.type} ${item.p} ${item.lengths.map(x => x.l).join(" ")}`;
      const matchesSearch = !search || text.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesP && matchesLength && matchesSearch;
    });
  }, [typeFilter, pFilter, lengthFilter, search]);

  const stats = {
    diameterCount: grouped.length,
    combinationCount: rows.length,
    maxLength: Math.max(...rows.map(r => r.l)),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 md:p-10 space-y-6">
        <div className="rounded-3xl bg-white shadow-sm border p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-slate-600">
                <Package className="h-4 w-4" />
                Straight Ejector Pins Catalog
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Tra cứu EPN / EPJ theo đường kính và chiều dài</h1>
              <p className="mt-2 text-slate-600 max-w-3xl">
                Giao diện web được dựng từ bảng catalog đã chuyển sang Excel. Bạn có thể lọc theo loại, đường kính P, chiều dài L hoặc tìm nhanh mã phù hợp.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <Card className="rounded-2xl shadow-none">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Số đường kính</div>
                  <div className="text-2xl font-bold">{stats.diameterCount}</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Tổ hợp P-L</div>
                  <div className="text-2xl font-bold">{stats.combinationCount}</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Chiều dài lớn nhất</div>
                  <div className="text-2xl font-bold">{stats.maxLength}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 border-b xl:border-b-0 xl:border-r bg-white">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-slate-600">
                Hình minh họa kỹ thuật
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Cấu tạo và kích thước cơ bản</h2>
              <p className="mt-2 text-slate-600 leading-7">
                Hình dưới giúp bạn nhìn nhanh phần đầu chốt, thân chốt và các kích thước chính như <strong>P</strong>, <strong>T</strong>, <strong>H</strong>, <strong>L</strong>. Khi tra bảng bên dưới, bạn có thể đối chiếu trực tiếp với hình để hiểu rõ hơn.
              </p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 border p-3"><strong>P</strong><div className="text-slate-600 mt-1">Đường kính</div></div>
                <div className="rounded-2xl bg-slate-50 border p-3"><strong>L</strong><div className="text-slate-600 mt-1">Chiều dài</div></div>
                <div className="rounded-2xl bg-slate-50 border p-3"><strong>T</strong><div className="text-slate-600 mt-1">Độ dày đầu</div></div>
                <div className="rounded-2xl bg-slate-50 border p-3"><strong>H</strong><div className="text-slate-600 mt-1">Chiều cao đầu</div></div>
              </div>
            </div>
            <div className="bg-slate-100 p-4 md:p-6">
              <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
                <img src={diagramSrc} alt="Sơ đồ cấu tạo straight ejector pins" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Filter className="h-5 w-5" /> Bộ lọc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tìm nhanh</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ví dụ: EPJ 8 600" className="pl-9 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Loại</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="EPN">EPN</SelectItem>
                    <SelectItem value="EPJ">EPJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Đường kính P</label>
                <Select value={pFilter} onValueChange={setPFilter}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {pOptions.map((p) => (
                      <SelectItem key={p} value={String(p)}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Chiều dài L</label>
                <Input value={lengthFilter} onChange={(e) => setLengthFilter(e.target.value)} placeholder="Ví dụ: 500" className="rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Card className="rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle>Danh sách kích thước</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 sticky top-0">
                      <tr>
                        <th className="text-left p-4 font-semibold">Type</th>
                        <th className="text-left p-4 font-semibold">P</th>
                        <th className="text-left p-4 font-semibold">Chiều dài khả dụng</th>
                        <th className="text-left p-4 font-semibold">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr key={`${item.type}-${item.p}`} className="border-t align-top hover:bg-slate-50">
                          <td className="p-4"><Badge variant="secondary" className="rounded-full">{item.type}</Badge></td>
                          <td className="p-4 font-medium">{item.p}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              {item.lengths.map((x) => (
                                <Badge key={`${item.type}-${item.p}-${x.l}`} variant="outline" className="rounded-full">
                                  {x.l}{x.lBracketed ? "*" : ""}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-slate-600">
                            {item.pBracketed ? "P trong ngoặc" : ""}
                            {item.pBracketed && item.lengths.some(x => x.lBracketed) ? ", " : ""}
                            {item.lengths.some(x => x.lBracketed) ? "L trong ngoặc (*)" : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5" /> Ghi chú catalog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p><strong>*</strong> Các chiều dài có dấu sao là giá trị nằm trong ngoặc ở catalog gốc.</p>
                <p>Một số giá trị <strong>P</strong> trong ngoặc đã được giữ nguyên để tránh mất dữ liệu khi chuyển đổi.</p>
                <p>Trang này phù hợp để tra cứu nhanh trước khi đặt hàng hoặc làm bảng chọn size nội bộ.</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Ví dụ mã đặt hàng</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <div className="rounded-2xl bg-slate-100 p-3 font-mono">EPN 3 - 100</div>
                <div className="rounded-2xl bg-slate-100 p-3 font-mono">EPJ 8 - 600</div>
                <div className="rounded-2xl bg-slate-100 p-3 font-mono">EPN 16 - 500 - NC</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
