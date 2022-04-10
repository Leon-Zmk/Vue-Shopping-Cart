Vue.component('product-display',{
    template:  
    `  
    <div class="container ">
    <div class="row p-5 mt-5" v-for="(product, index) in products" :key="index" >
        <div class="col-4">
                <img  :src="product.image" alt="">
        </div>
        <div class="col-8 p-5">
            <div class="d-flex justify-content-between align-items-center">
            <h5><span :class="['badge',{'bg-secondary':product.quantity>10},{'bg-danger':product.quantity<=10}]">Left-{{product.quantity}}</span></h5>
            <h3 class="w-50 mb-5">
                <i class="fas fa-shopping-cart" v-if="isReduce==false">{{ordered.filter(el=>el==product.id).length}}</i>
                <i class="fas fa-shopping-cart" v-else-if="isReduce==true">{{ordered.filter(el=>el==product.id).length}}</i>
            </h3>
            </div>
            <h3 v-if="product.id==1">
                Bubble Tea 
                <span v-if="product.quantity > 10 " class="badge  bg-info rounded-pill">In Stock</span>
                <span v-else-if="product.quantity > 1 && product.quantity <= 10" class="badge bg-secondary rounded-pill">Nearly Out Of Stock</span>
                <span v-else class="badge bg-danger rounded-pill">Out Of Stock</span>

            </h3>
            <h3 v-if="product.id==2">
                USB
                <span v-if="product.quantity > 10 " class="badge  bg-info rounded-pill">In Stock</span>
                <span v-else-if="product.quantity > 1 && product.quantity <= 10" class="badge bg-secondary rounded-pill">Nearly Out Of Stock</span>
                <span v-else class="badge bg-danger rounded-pill">Out Of Stock</span>
            </h3>
            <h3 v-if="product.id==3">
                Book
                <span v-if="product.quantity > 10 " class="badge  bg-info rounded-pill">In Stock</span>
                <span v-else-if="product.quantity > 1 && product.quantity <= 10" class="badge bg-secondary rounded-pill">Nearly Out Of Stock</span>
                <span v-else class="badge bg-danger rounded-pill">Out Of Stock</span>

            </h3>

            <ul v-for="(quality, qindex) in qualities" :key="qindex">
              
                <li v-if="index == 0 && qindex ==0" v-for="(q, iqindex) in quality" :key="iqindex">
                        {{q}} 
                </li>
                <li v-if="index ==1  && qindex==1" v-for="(q, iqindex) in quality" :key="iqindex">
                    {{q}}
                </li>
                <li v-if="index == 2 && qindex==2" v-for="(q, iqindex) in quality" :key="iqindex">
                    {{q}}
            </li>
            </ul>

            <button class="btn btn-outline-primary" @click="addToCart(product.id,product);sumCart();isReduce=false">Add To Cart</button>
            <button class="btn btn-outline-danger" @click="removeFromCart(product.id,product);isReduce=true">Remove From Cart</button>

        </div>
    </div>
</div>
    
    `,
    data(){
        
        return{
            isReduce:false,
             ordered:[

            ]   
            
        }
    },
    props:{
        products:{
            type:Array,
            required:true
        },
        qualities:{
            type:Array,
            required:true
        }
    }
    ,
    methods: {
        addToCart(x,q){
            isReduce=false;
            if(!q.quantity==0){
                this.ordered.push(x);
                this.products.map(function(el){
                    if(el.id==x ){
                        if(el.quantity){
                            q.quantity-=1
                        }
                    }
                   
                
                })
            }else{
                
            }

           
            
           
        },
        removeFromCart(x,q){
            if(this.ordered.includes(x)){
                let splicedArr=this.ordered.splice(this.ordered.indexOf(x),1)
                if(splicedArr==x && splicedArr.length){
                    q.quantity++
                }else{
                   
                }
            }else{
                
            }
          
            
        },
        sumCart(){
           this.$emit("to-parent",this.ordered)
        }
    },
})